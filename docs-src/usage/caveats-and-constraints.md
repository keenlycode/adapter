# Caveats and Constraints

This page collects the runtime details that matter when you move from trying Adapter to using it in real components.

## Supported Class CSS Patterns

Use one of these patterns for class-level CSS:

=== "`Class.css = ...`"

```ts
class Card extends Adapter {}

Card.css = `
  display: block;
`;
```

=== "`static { this.css = ... }`"

```ts
class Card extends Adapter {
  static {
    this.css = `
      display: block;
    `;
  }
}
```

Do not rely on this form:

```ts
class Card extends Adapter {
  static css = `
    display: block;
  `;
}
```

`static css = ...` creates a class field and does not reliably route through Adapter's static `css` accessor in the current runtime.

!!! info "Why this matters"

    Adapter expects shared class CSS to flow through its supported static API.

    If the class field form bypasses that path, the component can look valid in code while silently missing the runtime behavior the docs assume.

## `cssProcessor` Is Class-Level Only

`cssProcessor` transforms shared class CSS before Adapter writes it into the shared stylesheet.

It affects:

- `Class.css = ...`
- `static { this.css = ... }`
- `Class.addStyle(...)`

It does not affect:

- `element.css`
- the `css` attribute on an instance

!!! info "Mental boundary"

    `cssProcessor` belongs to the component class lifecycle.

    Instance CSS stays separate on purpose so local element overrides do not mutate the shared component contract.

Set it before `define()`:

```ts
class Tag extends Adapter.configure({ cssProcessor: minify }) {}

Tag.css = `
  display: inline-flex;
`;
```

## Lifecycle Requirements

If you override these methods on an Adapter-based element:

- call `super.connectedCallback()`
- call `super.remove()`

Adapter registers and removes styles in those base implementations.

## `define()` Is Part Of The Adapter Flow

Prefer:

```ts
Card.define("ui-card");
```

instead of calling `customElements.define(...)` directly.

`define()` is where Adapter completes its class-level stylesheet setup.

## Inheritance Works At The Class Style Layer

Parent class styles are collected before child class styles.

That means subclasses inherit shared class CSS by default, but instance CSS still stays local to each element.

## One More Rule Of Thumb

Use class-level CSS as the main component contract.

Use instance CSS only for local exceptions, not as the primary way to design a reusable component API.
