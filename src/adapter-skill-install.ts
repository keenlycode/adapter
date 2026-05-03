#!/usr/bin/env node
import { Command } from "@cliffy/command";
import {
  copyFile,
  mkdir,
  readdir,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import process from "node:process";
import { createInterface } from "node:readline/promises";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

const SKILL_NAMES = ["adapter-framework", "adapter-design-system"] as const;

type SkillName = typeof SKILL_NAMES[number];

type PackagedSkillSource =
  | { kind: "directory"; path: string }
  | { kind: "remote"; baseUrl: string; files: readonly string[] };

type InstallOptions = {
  to?: string;
  force?: boolean;
  dryRun?: boolean;
};

const SKILL_FILES: Record<SkillName, readonly string[]> = {
  "adapter-framework": [
    "SKILL.md",
    "references/index.md",
    "references/usage/ai-skill.md",
    "references/usage/caveats-and-constraints.md",
    "references/usage/core-concepts.md",
    "references/usage/css-processor.md",
    "references/usage/framework-integration.md",
    "references/usage/getting-started.md",
    "references/usage/patterns-and-recipes.md",
  ],
  "adapter-design-system": [
    "SKILL.md",
    "references/adapter-patterns.md",
    "references/architecture.md",
    "references/conversation-workflow.md",
  ],
};

async function exists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch (error) {
    if (isNotFoundError(error)) {
      return false;
    }
    throw error;
  }
}

function isNotFoundError(error: unknown): boolean {
  return error instanceof Error && "code" in error && error.code === "ENOENT";
}

function getArgs(): string[] {
  const deno = (globalThis as { Deno?: { args?: string[] } }).Deno;
  return deno?.args ?? process.argv.slice(2);
}

function exit(code: number): never {
  const deno =
    (globalThis as { Deno?: { exit?: (code: number) => never } }).Deno;
  deno?.exit?.(code);
  process.exit(code);
}

function defaultSkillsDir(): string {
  return join(homedir(), ".agents", "skills");
}

function expandHomePath(path: string): string {
  if (path === "~") {
    return homedir();
  }

  if (path.startsWith("~/") || path.startsWith("~\\")) {
    return join(homedir(), path.slice(2));
  }

  return path;
}

async function confirmDefaultSkillsDir(defaultDir: string): Promise<string> {
  if (!process.stdin.isTTY) {
    throw new Error(
      `No --to directory was provided and stdin is not interactive. Re-run with --to <skills-dir>, for example: --to ${defaultDir}`,
    );
  }

  const prompt = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    const answer = (await prompt.question(
      `Install Adapter AI skills to ${defaultDir}?\n` +
        "Press Enter to use this directory, type another path to override, or type n to cancel: ",
    )).trim();

    if (answer === "") {
      return defaultDir;
    }

    const normalizedAnswer = answer.toLowerCase();
    if (["n", "no", "q", "quit", "cancel"].includes(normalizedAnswer)) {
      throw new Error("Installation cancelled.");
    }

    if (["y", "yes"].includes(normalizedAnswer)) {
      return defaultDir;
    }

    return expandHomePath(answer);
  } finally {
    prompt.close();
  }
}

async function findPackagedSkillSource(
  skillName: SkillName,
): Promise<PackagedSkillSource> {
  const importUrl = new URL(import.meta.url);

  if (importUrl.protocol !== "file:") {
    return {
      kind: "remote",
      baseUrl: new URL(`./agent-skills/${skillName}/`, importUrl).href,
      files: SKILL_FILES[skillName],
    };
  }

  const cliDir = dirname(fileURLToPath(import.meta.url));
  const candidates = [
    join(cliDir, "agent-skills", skillName),
    join(cliDir, "..", "agent-skills", skillName),
    join(cliDir, "..", "..", "src", "agent-skills", skillName),
    join(process.cwd(), "src", "agent-skills", skillName),
  ];

  for (const candidate of candidates) {
    if (await exists(join(candidate, "SKILL.md"))) {
      return { kind: "directory", path: candidate };
    }
  }

  throw new Error(
    `Could not find packaged ${skillName} skill. Checked:\n${
      candidates.map((path) => `- ${path}`).join("\n")
    }`,
  );
}

function sourceLabel(source: PackagedSkillSource): string {
  return source.kind === "directory" ? source.path : source.baseUrl;
}

async function copyDirectory(
  source: string,
  destination: string,
): Promise<void> {
  await mkdir(destination, { recursive: true });

  for (const entry of await readdir(source, { withFileTypes: true })) {
    const sourcePath = join(source, entry.name);
    const destinationPath = join(destination, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(sourcePath, destinationPath);
      continue;
    }

    if (entry.isFile()) {
      await mkdir(dirname(destinationPath), { recursive: true });
      await copyFile(sourcePath, destinationPath);
    }
  }
}

async function copyRemoteSkill(
  source: Extract<PackagedSkillSource, { kind: "remote" }>,
  destination: string,
): Promise<void> {
  await mkdir(destination, { recursive: true });

  for (const file of source.files) {
    const sourceUrl = new URL(file, source.baseUrl);
    const response = await fetch(sourceUrl);

    if (!response.ok) {
      throw new Error(
        `Could not download ${sourceUrl.href}: ${response.status} ${response.statusText}`,
      );
    }

    const destinationPath = join(destination, file);
    await mkdir(dirname(destinationPath), { recursive: true });
    await writeFile(destinationPath, await response.text());
  }
}

async function copySkillSource(
  source: PackagedSkillSource,
  destination: string,
): Promise<void> {
  if (source.kind === "directory") {
    await copyDirectory(source.path, destination);
    return;
  }

  await copyRemoteSkill(source, destination);
}

async function installAdapterSkill(options: InstallOptions): Promise<void> {
  const targetDir = options.to
    ? options.to
    : options.dryRun
    ? defaultSkillsDir()
    : await confirmDefaultSkillsDir(defaultSkillsDir());
  const skillsDir = resolve(expandHomePath(targetDir));
  const installs = await Promise.all(
    SKILL_NAMES.map(async (skillName) => {
      const destination = join(skillsDir, skillName);

      return {
        destination,
        destinationExists: await exists(destination),
        skillName,
        source: await findPackagedSkillSource(skillName),
      };
    }),
  );

  if (options.dryRun) {
    for (const install of installs) {
      const mode = install.destinationExists
        ? options.force
          ? "overwrite"
          : "exists; install would fail without --force"
        : "create";

      console.log(`Would install ${install.skillName}:`);
      console.log(`  from: ${sourceLabel(install.source)}`);
      console.log(`  to:   ${install.destination}`);
      console.log(`  mode: ${mode}`);
    }
    return;
  }

  const existingInstalls = installs.filter((install) =>
    install.destinationExists
  );

  if (existingInstalls.length > 0 && !options.force) {
    throw new Error(
      `Skill already exists at:\n${
        existingInstalls.map((install) => `- ${install.destination}`).join("\n")
      }\nRe-run with --force to overwrite existing skills.`,
    );
  }

  await mkdir(skillsDir, { recursive: true });

  for (const install of installs) {
    if (install.destinationExists) {
      await rm(install.destination, { recursive: true, force: true });
    }

    await copySkillSource(install.source, install.destination);
    console.log(
      `Installed ${install.skillName} skill to ${install.destination}`,
    );
  }
}

try {
  await new Command()
    .name("adapter-skill-install")
    .description("Install the packaged Adapter AI skills.")
    .option(
      "--to <dir:string>",
      "Skills directory to install into. Without --to, prompts before using ~/.agents/skills.",
    )
    .option("--force", "Overwrite existing installed Adapter skills.")
    .option("--dry-run", "Show what would be installed without writing files.")
    .action((options: InstallOptions) => installAdapterSkill(options))
    .parse(getArgs());
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  exit(1);
}
