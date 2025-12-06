# AI Development Guide for Adapter

This project is intentionally structured so AI tools can safely help maintain and extend it.

## Goals

* Keep the public API of `Adapter` stable and well-documented.
* Prefer small, focused changes with tests.
* Preserve compatibility with Browser, Deno, and Node environments.
* Keep the core runtime small and dependency-light.

## Repo Overview (for AI tools)

* `src/` – Core TypeScript source for Adapter.
* `test-src/` – Tests and examples.
* `readme.md` – High-level overview and quickstart.
* `dev-guide/docstring.md` – Docstring style and conventions.
* `deno.json` – Deno tasks for build/test/docs.

When modifying or adding code:

1. Prefer editing existing files in `src/` over adding new top-level modules.
2. Keep functions and classes small and composable.
3. Follow existing naming and coding style.

## Tasks Style

When the user asks an AI tool to work on this repo, tasks should be phrased like:

* "Add a new helper to Adapter to support X, without breaking the existing API."
* "Refactor this part of the style composition for readability."
* "Add tests for a specific file or function."

AI output should ideally include:

* Focused, PR-sized changes.
* Clear explanation of modifications.
* Updated or new tests.

## Testing & Build

AI tools should expect:

```bash
deno task test
deno task dist
```

If tests cannot be executed, AI tools should:

* Avoid altering public API signatures without necessity.
* Keep changes isolated.

## Documentation & Docstrings

Follow the guidelines in `docstring_guide.md`:

* Short summary.
* Parameters with types.
* Return type.
* Edge cases or relevant notes.

## Change Safety Rules

AI tools should:

1. Prefer additive changes over breaking changes.
2. Keep public APIs documented.
3. Update examples if behaviour changes.
4. Avoid introducing new dependencies unless requested.
