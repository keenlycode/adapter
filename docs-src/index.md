# Adapter

Adapter is a small styling runtime for developers building native Web Components.

It gives custom elements a CSS-in-JS workflow without asking you to abandon the platform. You still write Custom Elements, standard CSS, and ES modules. Adapter adds a thin runtime layer for shared component styles, inherited class styles, and per-instance overrides.

## Why Developers Reach For Adapter

- It keeps the API small and close to platform primitives
- It gives each component a shared stylesheet instead of repeating inline styles
- It lets subclasses inherit styles through normal JavaScript inheritance
- It supports per-instance CSS when one element needs a local override
- It works well for design systems, internal tools, dashboards, and embedded widgets

## What The Workflow Feels Like

Adapter keeps the styling model simple:

1. Define shared class CSS for the component
2. Register the element with `.define(tagName)`
3. Override a single instance only when needed

That makes it useful when you want component-level styling with less framework overhead and more direct control over the browser's styling primitives.

## Minimal Example

```ts
import { Adapter } from "@devcapsule/adapter";

class Card extends Adapter {}

Card.css = `
  display: block;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(15, 23, 42, 0.14);
  background: white;
`;

Card.define("ui-card");
```

```html
<ui-card>
  <h2>Hello Adapter</h2>
  <p>This component uses shared class-level CSS.</p>
</ui-card>
```

## What Makes It Different

- Shared class-level CSS and instance-level CSS are separate on purpose
- Class styles follow inheritance, so base components stay reusable
- The runtime uses `CSSStyleSheet` and `adoptedStyleSheets` instead of inventing a parallel styling engine
- `Adapter` and `AdapterMixin` let you choose between a base class and mixin style integration

## AI Skill

Adapter ships with a local AI skill for coding assistants.

The goal is simple: this skill helps AI agents follow Adapter's actual runtime model instead of guessing from generic Web Components patterns.

If AI Skill is a new concept to you, read more on the dedicated [AI Skill](usage/ai-skill.md) page.

The skill covers things like:

- supported class CSS patterns such as `Class.css = ...` and `static { this.css = ... }`
- inheritance behavior for shared class-level CSS
- class-level `cssProcessor` behavior
- runtime caveats such as avoiding `static css = ...`

## Good Fit

- Building reusable Web Components with shared styling
- Creating a lightweight design system without a full UI framework
- Shipping components into environments with messy surrounding CSS
- Keeping styling logic in ES module code while still writing normal CSS

## Start Here

- [Getting Started](usage/getting-started.md)
- [Core Concepts](usage/core-concepts.md)
- [Patterns and Recipes](usage/patterns-and-recipes.md)
- [Caveats and Constraints](usage/caveats-and-constraints.md)
- [AI Skill](usage/ai-skill.md)
- [Framework Integration](usage/framework-integration.md)
