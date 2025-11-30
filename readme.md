# Adapter

Empowering Next-Generation UI Style with ES6 and Web Components

---

## Why Adapter?

Adapter is a lightweight CSS-in-JS toolkit for Web Components. It focuses on **styling and composition for custom elements**, not on yet another frontend framework.

Use Adapter when you:

* Want **encapsulated styles** for Web Components without wrestling with global CSS.
* Prefer **plain JavaScript/TypeScript** and Web Standards over heavy frameworks.
* Need a **tiny runtime** that can run in Browser, Node, or Deno.
* Want to build your own design system or UI library on top of Web Components.

Key ideas:

* CSS is **programmable**: define, inherit, compose, and extend styles using JS.
* Styles are **scoped to elements**: no accidental global overrides.
* Works in **plain HTML** (via CDN) or with modern build tools.

---

## Features

* 🧩 **Web Components first** – Designed specifically for custom elements and Shadow DOM.
* 🎨 **CSS-in-JS for components** – Write CSS as strings, but with scoping and composition rules.
* 🧬 **Style inheritance & reuse** – Share and extend styles between elements.
* 🪶 **Tiny bundle** – Small, dependency-light core suitable for modern apps.
* 🌐 **Multiple environments** – Usable from Browser, Deno, and Node-based tooling.
* 🧱 **Framework-agnostic** – Integrate with React, Vue, Svelte, or vanilla JS.

---

## Installation

### Via npm (Node / bundlers)

```bash
npm install @devcapsule/adapter
```

```ts
import { Adapter } from "@devcapsule/adapter";
```

### Via CDN (browser)

```html
<script type="module">
  import { Adapter } from "https://cdn.jsdelivr.net/npm/@devcapsule/adapter/+esm";
  // your code here
</script>
```

### Via Deno / JSR

```ts
import { Adapter } from "jsr:@devcapsule/adapter";
```

---

## Quick Start

Define a simple card component:

```ts
import { Adapter } from "https://cdn.jsdelivr.net/npm/@devcapsule/adapter/+esm";

class Card extends Adapter {
  static css = `
    display: block;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid currentColor;
  `;
}

Card.define("el-card");
```

```html
<el-card>
  <h2>Hello Adapter</h2>
  <p>This card is styled by the Adapter component.</p>
</el-card>
```

### Dynamic style updates

```ts
const card = new Card();
card.css = `
  display: flex;
  gap: 0.5rem;
`;

card.addStyle(`
  & h2 {
    margin: 0;
  }
`);

document.body.append(card);
```

---

## Concepts

### Adapter class

`Adapter` is the base class for creating stylable custom elements.

* `static css` – base CSS for all instances of the component.
* `addStyle(css: string)` – add more CSS rules, optionally with nested selectors.
* `define(tagName: string)` – register the custom element.

### Scoped CSS

Styles defined via `Adapter` are scoped to the element’s tag name, avoiding collisions with other components in the page.

### Working with Web Components

Adapter is built around the Custom Elements standard. You can:

* Define new elements via `class MyElement extends Adapter { ... }`.
* Mix Adapter into existing component hierarchies.
* Combine Adapter-based components with plain Web Components.

---

## Examples

### Layout component

```ts
class Container extends Adapter {
  static css = `
    display: block;
    margin: 0 auto;
    max-width: 960px;
    padding-inline: 1rem;
  `;
}

Container.define("app-container");
```

```html
<app-container>
  <el-card>
    <h2>Inside container</h2>
  </el-card>
</app-container>
```

### Theming (conceptual)

You can create theme helpers which compose CSS strings for Adapter components, or inject additional styles at runtime using `addStyle()`.

---

## API Overview

This is a high-level overview. See the dedicated documentation for complete details.

### `class Adapter`

Core base class for all stylable elements.

* `static css: string` – base stylesheet.
* `static define(tagName: string): void` – register the element.
* `static addStyle(css: string): void` – append additional style rules.

(Other methods and details are documented in the full API docs.)

---

## Development

For contributors and AI-assisted development, see `dev-guide/overview.md`.

## License

Adapter is released under the ISC license.

---

## Acknowledgements

Special thanks to early users and contributors who helped shape Adapter through feedback, ideas, and bug reports.
