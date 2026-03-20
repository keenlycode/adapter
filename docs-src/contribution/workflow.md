# Workflows

This file describes how to build, test, and release Adapter.

## Prerequisites

* Deno
* Git
* Optional: Node.js + npm

## Setup

```bash
# Bash
git clone https://github.com/keenlycode/adapter.git
cd adapter
npm install # optional
```

## Build

```bash
# Bash
deno task dist
```

Outputs go to `dist/`.

## Test

```bash
# Bash
deno task test
# or
npm test
```

## Docs

MkDocs (shadcn theme) builds from `docs-src/` using `mkdocs.yml` and emits the static site to `docs/`.

### Install doc tooling

Preferred (uses the pinned `pyproject.toml` + `uv.lock`):

```bash
# Bash
uv sync --group docs
```

Fallback:

```bash
# Bash
pip install mkdocs mkdocs-shadcn
```

### Build and preview

```bash
# Bash
uv run mkdocs build   # output in docs/
uv run mkdocs serve   # live preview at http://127.0.0.1:8000
```

You can swap `uv run` for `mkdocs` directly if the tools are on your PATH.
