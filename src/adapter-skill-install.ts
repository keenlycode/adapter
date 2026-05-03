#!/usr/bin/env node
import { Command } from "@cliffy/command";
import { copyFile, mkdir, readdir, rm, stat } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

const SKILL_NAMES = ["adapter-framework", "adapter-design-system"] as const;

type SkillName = typeof SKILL_NAMES[number];

type InstallOptions = {
  to?: string;
  force?: boolean;
  dryRun?: boolean;
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

function getEnv(name: string): string | undefined {
  const deno = (globalThis as {
    Deno?: { env?: { get(name: string): string | undefined } };
  }).Deno;
  return deno?.env?.get(name) ?? process.env[name];
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
  const codexHome = getEnv("CODEX_HOME");
  if (codexHome) {
    return join(codexHome, "skills");
  }

  return join(homedir(), ".codex", "skills");
}

async function findPackagedSkillDir(skillName: SkillName): Promise<string> {
  const cliDir = dirname(fileURLToPath(import.meta.url));
  const candidates = [
    join(cliDir, "agent-skills", skillName),
    join(cliDir, "..", "agent-skills", skillName),
    join(cliDir, "..", "..", "src", "agent-skills", skillName),
    join(process.cwd(), "src", "agent-skills", skillName),
  ];

  for (const candidate of candidates) {
    if (await exists(join(candidate, "SKILL.md"))) {
      return candidate;
    }
  }

  throw new Error(
    `Could not find packaged ${skillName} skill. Checked:\n${
      candidates.map((path) => `- ${path}`).join("\n")
    }`,
  );
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

async function installAdapterSkill(options: InstallOptions): Promise<void> {
  const skillsDir = resolve(options.to ?? defaultSkillsDir());
  const installs = await Promise.all(
    SKILL_NAMES.map(async (skillName) => {
      const destination = join(skillsDir, skillName);

      return {
        destination,
        destinationExists: await exists(destination),
        skillName,
        source: await findPackagedSkillDir(skillName),
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
      console.log(`  from: ${install.source}`);
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

    await copyDirectory(install.source, install.destination);
    console.log(
      `Installed ${install.skillName} skill to ${install.destination}`,
    );
  }
}

try {
  await new Command()
    .name("adapter-skill-install")
    .description("Install the packaged Adapter AI skills for Codex.")
    .option(
      "--to <dir:string>",
      "Skills directory to install into. Defaults to $CODEX_HOME/skills or ~/.codex/skills.",
    )
    .option("--force", "Overwrite existing installed Adapter skills.")
    .option("--dry-run", "Show what would be installed without writing files.")
    .action((options: InstallOptions) => installAdapterSkill(options))
    .parse(getArgs());
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  exit(1);
}
