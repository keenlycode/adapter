# Adapter

A small, fast styling runtime for Web Components with isolated styles and natural class-based inheritance.

Adapter lets you build Web Components with isolated styles, so your UI stays safe from messy global CSS while remaining easy to extend through plain JavaScript classes, objects, and inheritance. It keeps the mental model simple, the runtime small and fast, and the workflow easy enough to help you ship UI quickly, whether you're building a single component, a full design system, or UI that needs to ship across teams, products, and platforms.

## AI Skill

!!! info

    Adapter also ships with an optional Codex skill for AI coding assistants.

    Install it with `adapter-skill-install`, or read the [AI Skill](usage/ai-skill.md) page for install options and safe test commands.

    The skill itself contains the agent-facing Adapter guidance.

## Why Developers Reach For Adapter

- It isolates component CSS so host-page styles and component styles do not collide by accident
- It keeps the API small and close to platform primitives
- It gives each component a shared stylesheet instead of repeating inline styles
- It lets subclasses inherit styles through normal JavaScript inheritance
- It supports per-instance CSS when one element needs a local override
- It works well for design systems, internal tools, dashboards, and embedded widgets
- It can integrate smoothly with lightweight reactive tools such as ArrowJS

The current browser runtime build at `dist/browser/adapter.js` is about `3.7 KB` minified and about `1.2 KB` gzip.

## CSS Isolation First

Adapter is primarily about keeping component styling predictable.

- shared class CSS is scoped to the registered custom element
- internal selectors are written against the component instead of the whole page
- instance CSS stays local to one element instead of mutating the shared component contract

That makes Adapter useful in embeds, dashboards, CMS pages, and other environments where surrounding CSS may be noisy or hostile.

## What The Workflow Feels Like

Adapter keeps the styling model simple:

1. Define shared class CSS for the component
2. Register the element with `.define(tagName)`
3. Override a single instance only when needed

That makes it useful when you want isolated component styling with less framework overhead and more direct control over the browser's styling primitives.

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
- Shared component styles are scoped so they stay with the component instead of leaking across the page
- Class styles follow inheritance, so base components stay reusable
- The runtime uses `CSSStyleSheet` and `adoptedStyleSheets` instead of inventing a parallel styling engine
- `Adapter` and `AdapterMixin` let you choose between a base class and mixin style integration

## Good Fit

- Building reusable Web Components with shared styling
- Creating a lightweight design system without a full UI framework
- Shipping components into environments with messy surrounding CSS
- Keeping styling logic in ES module code while still writing normal CSS

## Start Here

- [Getting Started](usage/getting-started.md)
- [Core Concepts](usage/core-concepts.md)
- [Patterns and Recipes](usage/patterns-and-recipes.md)
- [Framework Integration](usage/framework-integration.md)
- [`cssProcessor`](usage/css-processor.md)
- [Caveats and Constraints](usage/caveats-and-constraints.md)
- [AI Skill](usage/ai-skill.md)
