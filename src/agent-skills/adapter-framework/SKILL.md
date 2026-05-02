---
name: adapter
description: Use when creating, modifying, reviewing, or debugging components that extend `Adapter` or `AdapterMixin`, especially when class CSS, instance CSS, inheritance, or `.define(...)` behavior matters.
---

# Adapter

Adapter is a small, fast styling runtime for Web Components with isolated styles and natural class-based inheritance.

It helps you build components with predictable, scoped CSS using plain JavaScript classes and objects. Keep answers focused on package consumers, not contribution workflow.

## Install

Prefer the documented npm compatibility flow:

- npm / bundlers: `npx jsr add @devcapsule/adapter`
- JSR / Deno: `import { Adapter } from "jsr:@devcapsule/adapter";`
- browser ESM via CDN: `import { Adapter } from "https://cdn.jsdelivr.net/npm/@devcapsule/adapter/+esm";`

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

## References

Use this skill as the default guide for normal Adapter answers.

If deeper examples or expanded docs context are needed, repo-local references are available under:

- `src/agent-skills/adapter-framework/references/`

## What to read next

- `src/agent-skills/adapter-framework/references/index.md`
- `src/agent-skills/adapter-framework/references/usage/getting-started.md`
- `src/agent-skills/adapter-framework/references/usage/core-concepts.md`
- `src/agent-skills/adapter-framework/references/usage/patterns-and-recipes.md`
- `src/agent-skills/adapter-framework/references/usage/css-processor.md`
- `src/agent-skills/adapter-framework/references/usage/framework-integration.md`
- `src/agent-skills/adapter-framework/references/usage/caveats-and-constraints.md`
- `src/agent-skills/adapter-framework/references/usage/ai-skill.md`
