# Workflows

This page collects the common build, test, and docs commands for working on the repo.

## Prerequisites

- Deno
- Node.js and npm
- `uv` for the docs toolchain

## Build the Runtime

```bash
deno task dist
```

Runtime output is written to `dist/browser/`.

## Typecheck

```bash
npx tsc --project tsconfig.json --noEmit
```

## Browser Test Flow

Build the browser test assets:

```bash
deno run --allow-all esbuild/test.js
```

Serve the test page:

```bash
engrave server test-src/ docs/test/ --watch-add='.*\\.js'
```

Then open the served page and check the Mocha results.

## Docs

MkDocs builds from `docs-src/` using `mkdocs.yml` and emits the static site to `docs/`.

Install the pinned docs toolchain:

```bash
uv sync --group docs
```

Build:

```bash
uv run mkdocs build
```

Serve with live reload:

```bash
uv run mkdocs serve --livereload
```

## Practical Rule

When behavior changes:

1. update runtime code
2. update tests
3. update docs/examples

That order keeps the docs from drifting away from the implementation.
