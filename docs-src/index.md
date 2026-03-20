# Adapter

Adapter is a small styling runtime for native Web Components.

It gives custom elements a clean CSS-in-JS style workflow without replacing the platform. You still write Custom Elements, standard CSS, and ES modules. Adapter adds a thin layer for shared component styles, inherited class styles, and per-instance overrides.

## What Adapter Is Good At

- Shared class-level CSS for every instance of a component
- Per-instance overrides without leaking into other elements
- Style inheritance that follows JavaScript class inheritance
- Modern browser styling with `CSSStyleSheet` and `adoptedStyleSheets`
- Working close to web standards instead of introducing a full UI framework

## What Adapter Is Not

- Not a virtual DOM library
- Not a templating framework
- Not a general CSS compiler
- Not a replacement for Shadow DOM

## The Core Mental Model

Adapter has two styling layers:

1. Class-level CSS
   Shared rules for every instance of a component class.
2. Instance-level CSS
   Scoped rules for one specific element.

That means:

- use `Class.css = ...` or `static { this.css = ... }` for component defaults
- use `Class.addStyle(...)` for more shared class-level rules
- use `element.css` for one-off instance overrides

## Minimal Example

```ts
import { Adapter } from "@devcapsule/adapter";

class Card extends Adapter {
  static {
    this.css = `
      display: block;
      padding: 1rem;
      border-radius: 0.75rem;
      border: 1px solid rgba(15, 23, 42, 0.14);
      background: white;
    `;
  }
}

Card.define("ui-card");
```

```html
<ui-card>
  <h2>Hello Adapter</h2>
  <p>This component uses shared class-level CSS.</p>
</ui-card>
```

## Important Note About Class CSS

In this repo, the supported class-level patterns are:

- `Class.css = ...`
- `static { this.css = ... }`

Do not rely on `static css = ...` class fields for Adapter styling. That field form does not reliably route through Adapter's static `css` accessor in the current runtime.

## Start Here

- [Getting Started](usage/getting-started.md)
- [Core Concepts](usage/core-concepts.md)
- [Patterns and Recipes](usage/patterns-and-recipes.md)
- [Framework Integration](usage/framework-integration.md)
