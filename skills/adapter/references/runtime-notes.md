# Runtime Notes

Use this file when you need runtime behavior or implementation-backed guidance for Adapter.

## Public exports

In the upstream package implementation, the public exports are:

- `Adapter`
- `AdapterMixin`
- `css`

The `css` export is currently `String.raw`.

## Core controllers

The upstream Adapter implementation has two controller layers:

- `AdapterClassController`
  - owns the shared `CSSStyleSheet` for a component class
  - stores the class tag name
  - aggregates inherited class styles
  - runs `adapter.cssProcessor` when compiling class CSS
- `AdapterObjectController`
  - owns the per-instance `CSSStyleSheet`
  - generates a stable UUID-based class name
  - observes the `css` attribute with `MutationObserver`
  - links the element instance back to its Adapter class

## Important behavior

- `.define(tagName)` calls `customElements.define(...)` and initializes the shared stylesheet.
- `Class.css = ...` or `static { this.css = ... }` replaces the class stylesheet content for that class.
- `Class.addStyle(...)` appends another class-level block.
- Class inheritance merges parent styles first, then child styles.
- `element.css = ...` writes a scoped rule for that one element instance.
- `element.addStyle(...)` appends another scoped rule for that one element instance.
- On connect, Adapter registers both the class stylesheet and instance stylesheet on the current root node.
- On `remove()`, Adapter removes the instance stylesheet from that root node.

## Practical constraints

- If you override `connectedCallback()`, call `super.connectedCallback()`.
  Otherwise Adapter will not register styles for the element.
- If you override `remove()`, call `super.remove()`.
  Otherwise the instance stylesheet cleanup will be skipped.
- `adapter.cssProcessor` affects class-level CSS only.
  It does not transform `element.css` or CSS set through the `css` attribute.
- Do not assume `static css = ...` class fields trigger Adapter's class-style setter.
  In this repo, prefer `Class.css = ...` or `static { this.css = ... }` for shared class-level CSS.
- The default `css` helper does not expand or compile CSS on its own.
  Nested rules rely on the browser's CSS support, or on a custom `adapter.cssProcessor`.
- Direct `customElements.define("x-tag", MyElement)` can still work in the current implementation, because Adapter can backfill tag/style setup when an instance is created.
  Even so, prefer `MyElement.define("x-tag")` in examples and generated code because it is the explicit library API.

## How to talk about Adapter accurately

Prefer these descriptions:

- "Adapter is a small styling runtime for Web Components."
- "It uses constructable `CSSStyleSheet` objects and `adoptedStyleSheets`."
- "It separates shared class styles from per-instance overrides."
- "Subclass styles inherit from parent component styles."

Avoid overstating it as:

- a full frontend framework
- a virtual DOM library
- a general CSS compiler
- a Shadow DOM replacement
