#!/usr/bin/env node
import { Command } from "@cliffy/command";
import { copyFile, mkdir, readdir, rm, stat } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

const SKILL_NAME = "adapter-framework";

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

async function findPackagedSkillDir(): Promise<string> {
  const cliDir = dirname(fileURLToPath(import.meta.url));
  const candidates = [
    join(cliDir, "agent-skills", SKILL_NAME),
    join(cliDir, "..", "agent-skills", SKILL_NAME),
    join(cliDir, "..", "..", "src", "agent-skills", SKILL_NAME),
    join(process.cwd(), "src", "agent-skills", SKILL_NAME),
  ];

  for (const candidate of candidates) {
    if (await exists(join(candidate, "SKILL.md"))) {
      return candidate;
    }
  }

  throw new Error(
    `Could not find packaged ${SKILL_NAME} skill. Checked:\n${
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
  const destination = join(skillsDir, SKILL_NAME);
  const source = await findPackagedSkillDir();
  const destinationExists = await exists(destination);

  if (options.dryRun) {
    const mode = destinationExists
      ? options.force
        ? "overwrite"
        : "exists; install would fail without --force"
      : "create";

    console.log(`Would install ${SKILL_NAME}:`);
    console.log(`  from: ${source}`);
    console.log(`  to:   ${destination}`);
    console.log(`  mode: ${mode}`);
    return;
  }

  if (destinationExists) {
    if (!options.force) {
      throw new Error(
        `Skill already exists at ${destination}. Re-run with --force to overwrite it.`,
      );
    }
    await rm(destination, { recursive: true, force: true });
  }

  await mkdir(skillsDir, { recursive: true });
  await copyDirectory(source, destination);

  console.log(`Installed ${SKILL_NAME} skill to ${destination}`);
}

try {
  await new Command()
    .name("adapter-skill-install")
    .description("Install the packaged Adapter AI skill for Codex.")
    .option(
      "--to <dir:string>",
      "Skills directory to install into. Defaults to $CODEX_HOME/skills or ~/.codex/skills.",
    )
    .option("--force", "Overwrite an existing installed Adapter skill.")
    .option("--dry-run", "Show what would be installed without writing files.")
    .action((options: InstallOptions) => installAdapterSkill(options))
    .parse(getArgs());
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  exit(1);
}
