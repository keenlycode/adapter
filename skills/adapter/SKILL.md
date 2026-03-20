---
name: adapter
description: Use when working with `@devcapsule/adapter` as an installed package. Focuses on install, finding `docs-src` in the published package, and the core runtime usage patterns users should follow.
---

# Adapter

Use this skill when the task involves installing or using `@devcapsule/adapter` as a package.

Keep answers focused on package consumers, not contribution workflow.

## Install

Prefer the documented npm compatibility flow:

- npm / bundlers: `npx jsr add @devcapsule/adapter`
- JSR / Deno: `import { Adapter } from "jsr:@devcapsule/adapter";`
- browser ESM via CDN: `import { Adapter } from "https://cdn.jsdelivr.net/npm/@devcapsule/adapter/+esm";`

## Find docs

For installed-package usage, point users to `docs-src/` in the published package.

To locate the package directory:

- node / npm:
  `node -p "require.resolve('@jsr/devcapsule__adapter/package.json')"`

- deno / jsr:
  `deno info jsr:@devcapsule/adapter`

Then look under:

- `docs-src/index.md`
- `docs-src/usage/getting-started.md`
- `docs-src/usage/core-concepts.md`
- `docs-src/usage/patterns-and-recipes.md`
- `docs-src/usage/caveats-and-constraints.md`
- `docs-src/usage/ai-skill.md`

## Runtime guidance

Explain the package with these defaults:

- import `Adapter` or `AdapterMixin`
- define shared component CSS with `Class.css = ...` or `static { this.css = ... }`
- register elements with `.define(tagName)`
- use `element.css` only for per-instance overrides
- use `configure(...)` for class-level config such as `cssProcessor`

Keep these guardrails:

- Prefer `.define(tagName)` as the normal registration API.
- Do not describe `static css = ...` class fields as a supported pattern.
- Treat `cssProcessor` as class-level only, not instance-level.
- Treat class-level CSS as the main API and instance CSS as the exception path.

## Source of truth

When answering package questions, use this order:

1. installed `docs-src/`
2. `src/mod.ts` and `src/adapter.ts` when runtime behavior needs verification
3. this skill as package-specific guidance

## What to read next

- `docs-src/index.md`
- `docs-src/usage/getting-started.md`
- `docs-src/usage/core-concepts.md`
- `docs-src/usage/patterns-and-recipes.md`
- `docs-src/usage/caveats-and-constraints.md`
- `docs-src/usage/ai-skill.md`
