# Adapter

**Adapter** is a tiny styling engine for **Web Components** focused on one core job: isolating component CSS.

It brings the convenience of CSS-in-JS to native Custom Elements with zero dependencies, a clean class-based API, and styles that stay scoped to the component instead of leaking through the page.

---

## Why Adapter?

Adapter is a lightweight CSS-in-JS toolkit for Web Components. It focuses on **isolated styling and composition for custom elements**, not on yet another frontend framework.

Use Adapter when you:

* Want **isolated component CSS** without wrestling with global CSS leakage.
* Prefer **plain JavaScript/TypeScript** and Web Standards over heavy frameworks.
* Need a **tiny runtime** that can run in Browser, Node, or Deno.
* Want to build your own design system or UI library on top of Web Components.

Key ideas:

* CSS is **programmable**: define, inherit, compose, and extend styles using JS.
* Styles are **isolated to the component**: no accidental global overrides or selector collisions.
* Works in **plain HTML** (via CDN) or with modern build tools.

---

## Features

* 🧩 **Web Components first** – Designed specifically for custom elements and Shadow DOM.
* 🎨 **CSS isolation for components** – Write CSS as strings, with scoping and composition rules built around custom elements.
* 🧬 **Style inheritance & reuse** – Share and extend styles between elements.
* 🪶 **Tiny bundle** – Small, dependency-light core suitable for modern apps.
* 🌐 **Multiple environments** – Usable from Browser, Deno, and Node-based tooling.
* 🧱 **Framework-agnostic** – Integrate with React, Vue, Svelte, or vanilla JS.

---

## Installation

### Via npm (Node / bundlers via JSR)

Use the official compatibility helper so npm tracks the exact JSR release:

```bash
npx jsr add @devcapsule/adapter
```

The command installs the compatibility package (`@jsr/devcapsule__adapter`) and adds the alias to your `package.json`, matching the [JSR npm compatibility guide](https://jsr.io/docs/npm-compatibility).

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

class Card extends Adapter {}
Card.css = `
  display: block;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid currentColor;
`;

Card.define("el-card");
```

```html
<el-card>
  <h2>Hello Adapter</h2>
  <p>This card is styled by the Adapter component.</p>
</el-card>
```
