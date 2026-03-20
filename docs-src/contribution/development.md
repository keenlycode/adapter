# Development Guide

This project is small enough that most changes should stay focused and easy to reason about.

## Development Goals

- keep the public API stable unless change is intentional
- keep the runtime small
- prefer clear behavior over clever abstractions
- add tests when changing runtime behavior
- update docs when examples or supported patterns change

## Source of Truth

When deciding what Adapter supports, use this order:

1. `src/adapter.ts`
2. tests in `test-src/`
3. docs in `docs-src/`

If these disagree, fix the docs or tests to match the runtime, or intentionally change the runtime and update both.

## Working Style

Prefer:

- small PR-sized changes
- explicit code over magic
- additive API changes over broad refactors
- examples that match actual runtime behavior

Avoid:

- changing public behavior without tests
- introducing new dependencies unless the benefit is clear
- documenting convenience patterns that the runtime does not really support

## Testing

This repo currently uses a browser-oriented test flow.

Typical verification steps:

```bash
npx tsc --project tsconfig.json --noEmit
deno run --allow-all esbuild/test.js
engrave server test-src/ docs/test/ --watch-add='.*\\.js'
```

Then open the test page in a browser and check the Mocha results.

For docs:

```bash
uv run mkdocs build
uv run mkdocs serve --livereload
```

## API and Example Discipline

Examples matter a lot in this repo because Adapter is a small API surface.

Prefer examples that use:

- `Class.css = ...`
- `static { this.css = ... }`
- `Class.addStyle(...)`
- `element.css`
- `.define(tagName)`

Be careful with:

- `static css = ...`

That class-field form should not be documented as a safe default unless runtime support is added deliberately.
