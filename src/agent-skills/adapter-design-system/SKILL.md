---
name: adapter-design-system
description: Guide users through planning, teaching, and implementing Adapter-based CSS-in-JS design systems. Use when creating or extending frontend UI architecture with design tokens, CSSStyleSheet/adoptedStyleSheets style modules, ES module CSS exports, base components, variants, or reusable UI patterns. For detailed Adapter runtime behavior, defer to the adapter-framework skill. Discuss decisions step by step, ask with concrete suggestions, align before implementation, and help users understand how to maintain and extend the UI later.
---

# Adapter Design System

Help the user learn, plan, and build a small adapter-based design system. Treat
this as a collaborative teaching workflow, not a one-shot scaffolding task.

## Core workflow

Use this sequence unless the user asks for a narrower task:

1. Inspect the existing frontend conventions before changing files.
2. Explain the next layer briefly.
3. Ask the user to choose or confirm with concrete suggestions and a recommended
   default.
4. Implement the smallest useful version after alignment.
5. Explain how the user can modify or extend the layer later.

Never dump a complete framework without alignment. Prefer a small,
understandable foundation.

## Architecture layers

Build in this order:

```txt
tokens → style utilities → CSS modules → base components → adapters/variants → patterns
```

- **Tokens**: raw and semantic design decisions such as colour, typography,
  spacing, shape, lift, and breakpoints.
- **Style utilities**: small functions that turn tokens into repeatable CSS
  fragments.
- **CSS modules**: ES module style sheets for global/default styling, usually
  exported from `*.css.ts` files.
- **Base components**: minimal Adapter classes such as `Base`, `Flex`, `Grid`,
  `Button`, `Card`, `Section`, `Content`, and `Prose`.
- **Adapters/variants**: subclasses or adapter compositions that extend base
  components without duplicating CSS.
- **Patterns**: repeatable compositions with explicit internal structure, such
  as navbar, hero, footer, form, pagination, and card lists.

Read `references/architecture.md` for the detailed layer model.

## Relationship to adapter-framework skill

This skill owns design-system planning, teaching, and architecture. It does not
own detailed Adapter runtime guidance.

When implementation depends on Adapter API behavior, use the `adapter-framework`
skill as the source of truth for:

- `Adapter` and `AdapterMixin`
- the `css` helper
- class-level and instance-level CSS behavior
- inheritance-based style composition
- `.define(tagName)` registration
- `configure(...)` and `cssProcessor`

Do not duplicate detailed Adapter runtime documentation here. Keep Adapter usage
examples lightweight and defer to the `adapter-framework` skill when correctness
depends on framework behavior.

## Ask with recommendations

When asking the user a question, include:

1. a short explanation,
2. 2-4 practical options,
3. a recommended default,
4. the reason for the recommendation.

Avoid open-ended questions without examples.

Example:

```txt
We need a token naming style. I recommend a hybrid approach because components can use semantic names while the palette remains available for rare cases.

Options:
1. Palette-only: blue.600, gray.100
2. Semantic-only: primary, surface, text
3. Hybrid: palette tokens plus semantic aliases

Recommended: hybrid. Should we use that?
```

Read `references/conversation-workflow.md` for teaching and alignment prompts.

## CSS-in-JS requirements

Use browser-native and module-friendly CSS-in-JS patterns:

- Prefer `CSSStyleSheet()` for document-level style modules that are adopted
  with `document.adoptedStyleSheets`.
- Export reusable style sheets from ES modules, especially `*.css.ts` files.
- Use Adapter component styles according to the `adapter-framework` skill and
  the project's existing conventions.
- Import tokens and utilities into CSS modules/components instead of hardcoding
  repeated values.
- Keep generated output separate from source files.

Read `references/adapter-patterns.md` for examples.

## Implementation rules

- Follow the repository's existing Adapter imports, file names, build tools, and
  generated asset flow.
- Start with one or two components to prove the pattern before adding many
  components.
- Prefer semantic tokens in component CSS; use raw palette tokens mainly inside
  token definitions.
- Promote repeated CSS logic into utilities only after a repeated need is clear.
- Create a pattern only when a composition has clear internal structure or
  repeated use.
- Explain file locations and extension points after each implemented layer.

## Validation

Use the project's frontend checks/build commands when available. If the project
has no obvious command, report that validation was not run and why.
