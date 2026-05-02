# AI Skill

Adapter ships with a local AI skill for coding assistants.

This page explains when to use it and how it helps AI-assisted work stay aligned with Adapter's actual runtime behavior.

If AI Skills are new to you, read more in the official Codex docs:

- [Codex](https://developers.openai.com/codex)
- [Codex Skills](https://developers.openai.com/codex/skills)

## When To Use It

Use the Adapter AI Skill when asking an AI agent to:

- build a component with `Adapter` or `AdapterMixin`
- explain how Adapter styling works
- debug styling or inheritance behavior
- review Adapter-based code
- update docs or examples for Adapter usage
- answer questions about `cssProcessor`, `element.css`, or `.define(...)`

## How To Use It

The simplest way to use it is to tell the AI agent to use the Adapter skill before it starts solving the task.

That gives the agent repo-local guidance about the supported Adapter patterns and caveats in this codebase.

In practice, that means the agent should:

- prefer `Class.css = ...` or `static { this.css = ... }` for class-level CSS
- avoid describing `static css = ...` as a supported runtime pattern
- use `.define(tagName)` as the normal registration API
- keep shared class-level CSS and instance-level CSS conceptually separate
- treat `cssProcessor` as a class-level feature

## What It Helps With

The skill is most useful when you want an AI agent to stay accurate about:

- supported API usage
- styling inheritance
- shared class-level CSS versus instance-level overrides
- runtime constraints
- docs examples that should match the actual implementation

## Where The Skill Lives

The skill file is:

- [skills/adapter/SKILL.md](https://github.com/keenlycode/adapter/blob/main/skills/adapter/SKILL.md)

That file gives AI assistants Adapter-specific instructions and references for this repo.

## Source Of Truth

The skill is a guide, not the runtime.

When there is any conflict:

1. trust `src/adapter.ts`
2. then trust the main docs pages
3. treat the skill as a repo-local guide for AI-assisted work
