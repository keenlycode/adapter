# Development Guide for AI

This project is intentionally structured so AI tools can safely help maintain and extend it.

## Goals

- Keep the public API of `Adapter` stable and well-documented.
- Prefer small, focused changes with tests.
- Preserve compatibility with Browser, Deno, and Node environments.
- Keep the core runtime small and dependency-light.

## Repo Overview (for AI tools)

- `src/` – Core TypeScript source for Adapter.
- `test-src/` – Tests and examples.
- `readme.md` – High-level overview and quickstart.
- `dev-guide/docstring.md` – Docstring style and conventions (follow this for any new API docs).
- `deno.json` – Deno tasks for build/test/docs.

When modifying or adding code:

1. Prefer editing existing files in `src/` over adding new top-level modules, unless required.
2. Keep functions and classes small and composable.
3. Follow existing naming and coding style.

## Tasks Style

When ask an AI to work on this repo, describe tasks like:

- “Add a new helper on Adapter to support X, without breaking existing API.”
- “Refactor this part of the style composition for readability, keep behaviour the same.”
- “Add tests for [file / function] to cover these scenarios: …”

Ask for:
- Small PR-sized changes.
- Clear explanation of what was changed.
- Updated or new tests.

## Testing & Build

AI tools should ALWAYS:

- Run tests after making changes:

  ```bash
  deno task test
