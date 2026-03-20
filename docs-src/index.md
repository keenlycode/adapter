# Adapter

Adapter is a small styling engine for Web Components. It gives you scoped, composable CSS with a class-based API and no framework lock-in.

## Why Adapter

- Scoped styles for custom elements without leaking into the page
- Plain JavaScript and TypeScript API with no new templating model
- Small runtime suitable for browser, Node, and Deno workflows
- Good fit for embeds, widgets, design systems, and reusable UI packages

## Quick Example

```ts
// TypeScript
import { Adapter } from "https://cdn.jsdelivr.net/npm/@devcapsule/adapter/+esm";

class Card extends Adapter {}

Card.css = `
  display: block;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid currentColor;
`;

Card.define("el-card");
```

## Start Here

- [Getting Started](usage/getting-started.md)
- [Core Concepts](usage/core-concepts.md)
- [Patterns and Recipes](usage/patterns-and-recipes.md)
- [Framework Integration](usage/framework-integration.md)

## What You Get

| Capability | Description |
| --- | --- |
| Scoped CSS | Rules stay tied to your component instead of colliding with host styles |
| Style composition | Extend and share styles across related elements |
| Framework agnostic | Use Adapter with plain Web Components or alongside UI frameworks |
| Lightweight runtime | Keep styling overhead small without adding a large abstraction layer |

## Contributing

Contribution and development documentation lives in the `Contribution` section of this site.
