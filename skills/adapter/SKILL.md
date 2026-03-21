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

For installed-package usage, prefer the generated skill references snapshot when it is present:

- `skills/adapter/references/`

If that snapshot is not available, point users to `docs-src/` in the published package.

To locate the package directory:

- node / npm:
  `node -p "require.resolve('@jsr/devcapsule__adapter/package.json')"`

- deno / jsr:
  `deno info jsr:@devcapsule/adapter`

Then look under one of these roots:

- `skills/adapter/references/`
- `docs-src/`

Key files:

- `index.md`
- `usage/getting-started.md`
- `usage/core-concepts.md`
- `usage/patterns-and-recipes.md`
- `usage/css-processor.md`
- `usage/framework-integration.md`
- `usage/caveats-and-constraints.md`
- `usage/ai-skill.md`

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

1. generated `skills/adapter/references/` when present
2. installed `docs-src/`
3. `src/mod.ts` and `src/adapter.ts` when runtime behavior needs verification
4. this skill as package-specific guidance

## What to read next

- `skills/adapter/references/index.md`
- `skills/adapter/references/usage/getting-started.md`
- `skills/adapter/references/usage/core-concepts.md`
- `skills/adapter/references/usage/patterns-and-recipes.md`
- `skills/adapter/references/usage/css-processor.md`
- `skills/adapter/references/usage/framework-integration.md`
- `skills/adapter/references/usage/caveats-and-constraints.md`
- `skills/adapter/references/usage/ai-skill.md`
