---
name: adapter
description: Use when working with `@devcapsule/adapter` as an installed package. Covers `Adapter`, `AdapterMixin`, `configure(...)`, class-level CSS via `Class.css = ...` or `static { this.css = ... }`, instance-level `element.css`, `.define(tagName)`, inherited styles, and class-level `cssProcessor` behavior.
---

# Adapter

Use this skill when the task involves `@devcapsule/adapter`, especially when a user wants to use the package from npm, explain its public API, or build custom elements with `Adapter` or `AdapterMixin`.

Treat Adapter as a small styling runtime for native Web Components in ES modules. The main usage model is:

- install the package
- import `Adapter` or `AdapterMixin`
- define shared class-level CSS with `Class.css = ...` or `static { this.css = ... }`
- use `.define(tagName)` to register the element
- use `element.css` only for per-instance overrides

Use `configure(...)` when class-level config such as `cssProcessor` should be declared at the subclass boundary.

For installation, prefer the same guidance as the public docs:

- npm / bundlers: `npx jsr add @devcapsule/adapter`
- JSR / Deno: `import { Adapter } from "jsr:@devcapsule/adapter";`
- browser ESM via CDN: `import { Adapter } from "https://cdn.jsdelivr.net/npm/@devcapsule/adapter/+esm";`

When discussing npm usage, describe `npx jsr add @devcapsule/adapter` as the preferred install path for this package.
For external users and AI tools, point to the public docs site first: `https://keenlycode.github.io/adapter/`.

For package usage, start with public docs and public API:

- Treat the docs site as the first reference for normal usage and examples:
  - `https://keenlycode.github.io/adapter/`
  - `docs-src/usage/getting-started.md`
  - `docs-src/usage/core-concepts.md`
  - `docs-src/usage/patterns-and-recipes.md`
  - `docs-src/usage/caveats-and-constraints.md`
- Treat `references/usage.md` as the quick package-usage cheat sheet.
- Treat `src/mod.ts` and `src/adapter.ts` as the source of truth only when exact runtime behavior needs verification.

When answering, prioritize the package API and supported patterns:

- Explain `Adapter`, `AdapterMixin`, `configure(...)`, `Class.css = ...`, `static { this.css = ... }`, `addStyle(...)`, `element.css`, and `.define(tagName)`.
- Use the mental model of shared component rules plus per-instance overrides.
- Treat implementation details as optional unless the task is specifically about runtime behavior or internals.

## Default usage pattern

Prefer this shape unless the codebase already uses another pattern:

```ts
import { Adapter } from "@devcapsule/adapter";

class MyElement extends Adapter {
  static {
    this.css = `
      display: block;
    `;
  }
}

MyElement.define("my-element");
```

Key rules:

- Use `Adapter` when the component can extend `HTMLElement` directly.
- Use `AdapterMixin(Base)` when the component must keep an existing `HTMLElement` subclass in its inheritance chain.
- Use `Class.configure({ cssProcessor })` when class-level config should be declared at the subclass boundary.
- Put shared component styling in `Class.css = ...`, `static { this.css = ... }`, or `Class.addStyle(...)`.
- Use `element.css` or the `css` attribute only for one-off instance overrides.
- Prefer `.define(tagName)` as the normal Adapter API for registering a component and initializing its shared stylesheet.
- Do not describe `static css = ...` class fields as a supported Adapter pattern. In this repo, that field form does not reliably route through Adapter's static `css` accessor.

## Mental model

Adapter has two styling layers:

- Class-level CSS: shared component rules for a component class.
- Instance-level CSS: scoped to one element instance.

That means:

- `Class.css = ...`, `static { this.css = ... }`, and `Class.addStyle()` define the component's shared styling rules.
- `element.css` and `element.addStyle()` modify one specific element.
- Subclasses inherit parent class styles automatically.
- `Class.configure({ cssProcessor })` creates a new subclass branch with inherited class-level config plus explicit overrides.

## Authoring guidance

- For npm-installed usage, answer from the public API first and avoid leading with repo internals.
- Point users and AI tools to the public docs for examples and supported patterns before quoting implementation details.
- Call `super.connectedCallback()` when overriding `connectedCallback()` on an Adapter-based element.
  Adapter registers styles in its own `connectedCallback()`.
- Call `super.remove()` when overriding `remove()`.
  Adapter removes the instance stylesheet there.
- Set `MyElement.adapter.cssProcessor` before `define()` if you need to transform class-level CSS.
- Prefer `MyElement.configure({ cssProcessor })` when config should be attached at class declaration time or branched per subclass.
- Do not assume `cssProcessor` affects `element.css`; it only applies to class-level CSS.
- The exported `css` helper is currently just `String.raw`. Do not describe Adapter as a full CSS parser or compiler.
- Treat nested selectors as normal CSS behavior, not special Adapter syntax.
  If a task depends on nonstandard CSS transforms, use a custom `cssProcessor` or verify browser support first.

## What to read next

- Read `references/usage.md` and start at `API cheat sheet`.
- For external users or npm-installed usage outside this repo, use the public docs site first:
  - `https://keenlycode.github.io/adapter/`
- For runtime behavior and implementation-backed constraints, read `references/runtime-notes.md`.
