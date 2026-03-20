# Adapter

**Adapter** is a tiny, elegant styling engine for **Web Components**.

It brings the convenience of CSS-in-JS to native Custom Elements with zero dependencies, scoped styles, and a clean class-based API.

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
