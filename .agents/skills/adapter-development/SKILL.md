---
name: adapter-development
description: "Use when developing this Adapter repository itself: runtime changes, docs workflow, dev CLI behavior, Python tooling, Deno validation, dependency updates, and maintaining concise repo development concepts as conventions evolve. Do not use for consumer-only Adapter usage questions unless repository development guidance is also needed."
---

# Adapter Development

Use this skill for development of the `@devcapsule/adapter` repository itself. Keep it conceptual and current; do not turn it into full API docs, generated references, task history, or agent-team policy.

## Operating Rule

- Build context from repository files before changing behavior.
- Prefer the smallest correct change.
- Preserve user changes in a dirty worktree.
- Do not commit, amend, push, or run destructive git commands unless explicitly requested.

## Runtime Concept

Adapter is a small Deno/TypeScript Web Components styling runtime. Preserve the public API shape unless the user explicitly asks for an API change:

- `Adapter`
- `AdapterMixin`
- `css`
- `.define(tagName)` as the normal registration API
- class-level CSS as the primary styling API
- inheritance-based style composition
- class-level `configure(...)` behavior such as `cssProcessor`

Treat per-instance CSS as an exception path. Do not document or promote unsupported patterns such as `static css = ...` unless runtime support and docs are intentionally changed.

## Docs Concept

- Edit docs source in `docs-src/`.
- Treat `src/agent-skills/adapter-framework/references/` as generated output.
- Run `deno task docs:build` when docs or generated skill references need build validation.
- Use `uv run python dev/cli.py docs skill-sync` when only syncing docs into skill references.
- Files or folders in `docs-src/` whose names start with `_` are skipped during skill-reference sync.

## Dev CLI Concept

The repo-local Python CLI is `uv run python dev/cli.py`.

Important commands:

- `uv run python dev/cli.py docs skill-sync` syncs `docs-src/` to generated skill references.
- `uv run python dev/cli.py docs build` syncs references and runs `mkdocs build`.
- `uv run python dev/cli.py docs serve` syncs references and runs `mkdocs serve --livereload`.
- `uv run python dev/cli.py dev` runs `deno task test`.
- `uv run python dev/cli.py build` syncs references and runs `deno task dist`.

Prefer Deno task wrappers from `deno.json` when they match the requested workflow.

## Validation Concept

Choose targeted validation for the touched area:

- Runtime TypeScript: `deno check`, `deno lint`, and relevant `deno task dist:*` commands.
- Docs: `deno task docs:build`.
- Python CLI: `uv run ty check dev/cli.py` and `uv lock --check` after dependency changes.
- Avoid long-running watch/server tasks unless the user asks or confirms a long-running process.

## Dependency Concept

- Python package management uses `uv` and `pyproject.toml`.
- Keep direct dependency bounds intentional: allow the current supported major, and update `uv.lock` when constraints change.
- Validate CLI typing and docs build after Python docs/dev dependency upgrades.
- Deno tasks and package metadata live in `deno.json`; published TypeScript runtime behavior should remain independent of Python docs tooling.

## Self-Maintenance

When development changes a durable repository convention, update this skill if the user asks for or confirms the concept change.

Keep self-updates concise:

- Record only stable development concepts.
- Remove stale concepts instead of accumulating exceptions.
- Do not duplicate detailed docs, generated references, task files, or transient command output.
- Re-run skill validation after editing this skill.
