# AI Skill

Adapter ships with optional Codex skills for AI coding assistants.

This page focuses on installing and verifying the skills. The skills contain the
agent-facing Adapter guidance.

If AI Skills are new to you, read more in the official Codex docs:

- [Codex](https://developers.openai.com/codex)
- [Codex Skills](https://developers.openai.com/codex/skills)

## Install The Skills

Adapter includes a CLI that installs the packaged skills into your local Codex
skills directory:

```bash
adapter-skill-install
```

By default, it installs to `$CODEX_HOME/skills` when `CODEX_HOME` is set,
otherwise `~/.codex/skills`.

For Deno/JSR one-shot usage, run the exported installer:

```bash
deno run -A jsr:@devcapsule/adapter/adapter-skill-install
```

For npm-compatible projects, add Adapter through JSR first:

```bash
npx jsr add @devcapsule/adapter
```

Then run the installed package bin from the project:

```bash
npx adapter-skill-install
```

The command copies the bundled `adapter-framework` and `adapter-design-system`
skills into the target skills directory.

## Install Location

By default, the installer writes to:

1. `$CODEX_HOME/skills` when `CODEX_HOME` is set
2. `~/.codex/skills` otherwise

After installation, the skills directory should include:

```text
adapter-framework/
  SKILL.md
  references/
adapter-design-system/
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

Use `--dry-run` to preview the destination without writing files. Use `--to`
when testing or installing into a non-default skills directory. Use `--force`
only when you intentionally want to replace existing Adapter skills.

## Test The Installer Safely

To test the installer without touching your real Codex skills directory, install
into a temporary directory:

```bash
tmp=$(mktemp -d /tmp/adapter-skill-test.XXXXXX)
deno run -A jsr:@devcapsule/adapter/adapter-skill-install --to "$tmp"
ls "$tmp/adapter-framework"
ls "$tmp/adapter-design-system"
```

Expected output includes `SKILL.md` and `references/`.

To verify overwrite protection, run the same install command again. It should
fail and tell you to re-run with `--force` if you want to overwrite the existing
skills.

## Where The Skills Live

The packaged skill sources are:

- [src/agent-skills/adapter-framework/SKILL.md](https://github.com/keenlycode/adapter/blob/main/src/agent-skills/adapter-framework/SKILL.md)
- [src/agent-skills/adapter-design-system/SKILL.md](https://github.com/keenlycode/adapter/blob/main/src/agent-skills/adapter-design-system/SKILL.md)
