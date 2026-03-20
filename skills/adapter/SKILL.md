---
name: adapter
description: Use when working with @devcapsule/adapter. Covers how to build or explain Web Components with Adapter or AdapterMixin, shared class-level CSS, instance-level css overrides, inherited styles, css attributes, and class-level cssProcessor behavior.
---

# Adapter

Use this skill when the task involves `@devcapsule/adapter`, or when a user wants to build, explain, debug, or review custom elements styled with `Adapter` or `AdapterMixin`.

Start with the public API and usage model:

- Explain `Adapter`, `AdapterMixin`, `static css`, `addStyle(...)`, `element.css`, and `.define(tagName)`.
- Use the mental model of shared component rules plus per-instance overrides.
- Treat implementation details as optional unless the task is specifically about runtime behavior or internals.

When local package source or upstream source is available, use it to verify behavior:

- Start with `src/mod.ts` and `src/adapter.ts` for the real API and behavior.
- Use the usage docs for examples and intent, especially:
  - `docs-src/usage/getting-started.md`
  - `docs-src/usage/core-concepts.md`
  - `docs-src/usage/patterns-and-recipes.md`
- If examples or docs conflict with the runtime, trust `src/adapter.ts`.

## Default usage pattern

Prefer this shape unless the codebase already uses another pattern:

```ts
import { Adapter } from "@devcapsule/adapter";

class MyElement extends Adapter {
  static css = `
    display: block;
  `;
}

MyElement.define("my-element");
```

Key rules:

- Use `Adapter` when the component can extend `HTMLElement` directly.
- Use `AdapterMixin(Base)` when the component must keep an existing `HTMLElement` subclass in its inheritance chain.
- Put shared component styling in `static css` or `static addStyle(...)`.
- Use `element.css` or the `css` attribute only for one-off instance overrides.
- Prefer `.define(tagName)` as the normal Adapter API for registering a component and initializing its shared stylesheet.

## Mental model

Adapter has two styling layers:

- Class-level CSS: shared component rules for a component class.
- Instance-level CSS: scoped to one element instance.

That means:

- `static css` and `static addStyle()` define the component's shared styling rules.
- `element.css` and `element.addStyle()` modify one specific element.
- Subclasses inherit parent class styles automatically.

## Authoring guidance

- Call `super.connectedCallback()` when overriding `connectedCallback()` on an Adapter-based element.
  Adapter registers styles in its own `connectedCallback()`.
- Call `super.remove()` when overriding `remove()`.
  Adapter removes the instance stylesheet there.
- Set `MyElement.adapter.cssProcessor` before `define()` if you need to transform class-level CSS.
- Do not assume `cssProcessor` affects `element.css`; it only applies to class-level CSS.
- The exported `css` helper is currently just `String.raw`. Do not describe Adapter as a full CSS parser or compiler.
- Treat nested selectors as normal CSS behavior, not special Adapter syntax.
  If a task depends on nonstandard CSS transforms, use a custom `cssProcessor` or verify browser support first.

## What to read next

- For normal usage and copyable patterns, read `references/usage.md`.
- For runtime behavior and implementation-backed constraints, read `references/runtime-notes.md`.
