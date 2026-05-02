# AI Skill

Adapter ships with an optional Codex skill for AI coding assistants.

This page focuses on installing and verifying the skill. The skill itself contains the agent-facing Adapter guidance.

If AI Skills are new to you, read more in the official Codex docs:

- [Codex](https://developers.openai.com/codex)
- [Codex Skills](https://developers.openai.com/codex/skills)

## Install The Skill

Adapter includes a CLI that installs the packaged skill into your local Codex skills directory:

```bash
adapter-skill-install
```

By default, it installs to `$CODEX_HOME/skills` when `CODEX_HOME` is set, otherwise `~/.codex/skills`.

If Adapter is installed in an npm project, the installer is exposed as the package bin:

```bash
npx adapter-skill-install
```

For one-shot npm usage without adding Adapter to a project first, ask `npx` to fetch the package and run its bin:

```bash
npx -p @devcapsule/adapter adapter-skill-install
```

For Deno/JSR one-shot usage, run the exported installer:

```bash
deno run -A jsr:@devcapsule/adapter/adapter-skill-install
```

The command copies the bundled `adapter-framework` skill into the target skills directory.

## Install Location

By default, the installer writes to:

1. `$CODEX_HOME/skills` when `CODEX_HOME` is set
2. `~/.codex/skills` otherwise

After installation, the skill directory should look like:

```text
adapter-framework/
  SKILL.md
  references/
```

## Options

Useful options:

```bash
adapter-skill-install --dry-run
adapter-skill-install --to /path/to/skills
adapter-skill-install --force
```

Use `--dry-run` to preview the destination without writing files. Use `--to` when testing or installing into a non-default skills directory. Use `--force` only when you intentionally want to replace an existing `adapter-framework` skill.

## Test The Installer Safely

To test the installer without touching your real Codex skills directory, install into a temporary directory:

```bash
tmp=$(mktemp -d /tmp/adapter-skill-test.XXXXXX)
npx -p @devcapsule/adapter adapter-skill-install --to "$tmp"
ls "$tmp/adapter-framework"
```

Expected output includes `SKILL.md` and `references/`.

To verify overwrite protection, run the same install command again. It should fail and tell you to re-run with `--force` if you want to overwrite the existing skill.

## Where The Skill Lives

The packaged skill source is:

- [src/agent-skills/adapter-framework/SKILL.md](https://github.com/keenlycode/adapter/blob/main/src/agent-skills/adapter-framework/SKILL.md)
