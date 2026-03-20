# Contribution Overview

This section is for people working on the Adapter repository itself.

## What Lives In This Repo

- `src/`
  The Adapter runtime source.
- `test-src/`
  Browser-oriented tests and test pages.
- `esbuild/`
  Build scripts for browser/test output.
- `docs-src/`
  MkDocs source content.
- `docs/`
  Built site output.
- `mkdocs.yml`
  MkDocs configuration.
- `pyproject.toml`
  Pinned docs toolchain.
- `deno.json`
  Deno tasks and runtime config.

## Project Direction

Adapter aims to stay:

- small
- explicit
- close to web standards
- safe to extend without turning into a heavy framework

When contributing, prefer changes that keep the public API understandable from the docs and examples.

## Runtime Truth vs Docs

Examples and docs should follow the runtime, not the other way around.

If examples disagree with implementation:

1. verify behavior in `src/adapter.ts`
2. update the docs or tests
3. avoid documenting unsupported patterns as if they are first-class API

## Current Documentation Conventions

For class-level CSS examples in this repo, prefer:

- `Class.css = ...`
- `static { this.css = ... }`

Do not present `static css = ...` class fields as a supported default pattern unless the runtime is explicitly changed to support that behavior.
