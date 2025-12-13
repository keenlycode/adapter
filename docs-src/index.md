# Adapter Guide

Fast. Clean. Isolated. Compact. Web Component styling that just works.

Adapter makes UI development peaceful again. It gives you clean, isolated CSS without special tools, without new syntax, and without fighting with global styles. Your components look exactly the way you design them — anywhere they run.

---

## Why Adapter?

### CSS that never collides
Every component gets its own safe styling space. No more mystery overrides from global CSS, legacy systems, or other frameworks.

### Drop into any stack
React, Vue, Svelte, Lit, Deno, Bun, or plain JS — Adapter works with everything, and it never locks you in.

### Made for widgets, plugins, and AI-driven UI
When you embed UI into other systems (chatbots, workflow panels, extensions, etc.), global CSS becomes unpredictable. Adapter keeps host CSS out and your component styles in.

### No build step, no new syntax
Write normal CSS. Use nesting, selectors, hover, children — everything you already know. Adapter applies encapsulation behind the scenes.

### Compact and lightweight
Adapter is extremely small (≈ 2 kB gzipped). It loads instantly, adds almost no runtime overhead, and keeps your bundle lean.

### Built for long-term maintainability
Styles live with the component. No global cascade. No naming conventions to memorize. No creeping side effects.

### One UI system for every platform
Adapter components run everywhere: web apps, internal tools, Electron/Tauri, extensions, mobile webviews, hybrid apps, and embedded widgets. One codebase → all environments.

---

## What developers get

- clean, readable CSS
- automatic style isolation
- safe embedding into any host page
- framework-agnostic components
- scalable, maintainable UI
- low bundle size and fast performance

Adapter’s goal is simple:

> Make styling Web Components effortless — today and in the future.

---

## Quick Example

```ts
import { Adapter } from '@devcapsule/adapter'

class Card extends Adapter {
  static css = `
    padding: 1rem;
    border-radius: 12px;
    background: white;

    &:hover {
      background: #f3f4ff;
    }

    & > h2 {
      font-size: 1.05rem;
    }
  `
}

Card.define('el-card')
```

```html
<el-card>
  <h2>Hello Adapter</h2>
</el-card>
```

---

## Built for real-world UI

- **Design systems**: reusable components with predictable styling and clean inheritance.
- **Internal tools & dashboards**: stable, maintainable UIs as your team and codebase grow.
- **Automation & AI surfaces**: render UI safely from bots, workflows, or server-generated pages.
- **Plugins & embeddable widgets**: drop custom UI into other systems without worrying about their CSS.

---

## [Usage](/usage/getting-started)

- Start: [Getting Started](/usage/getting-started).
- Concepts: [Core Concepts](/usage/core-concepts) (class vs object styles, inheritance, isolation).
- Cookbook: [Patterns & Recipes](/usage/patterns-and-recipes).
- Frameworks: [Framework Integration](/usage/framework-integration) (React, Vue, etc.).
- CSS processing: [CSS Processing](/usage/css-processing) for Stylis/PostCSS via tagged templates.

## [Contribute](/contribution/overview)

- Overview and expectations: [Overview](/contribution/overview).
- Workflow: [Workflow](/contribution/workflow).
- Development setup: [Development](/contribution/development).
- Docstring/style guidance: [Docstring Guide](/contribution/docstring).

Run the site locally with MkDocs:

```bash
uv sync --group docs  # installs MkDocs
uv run mkdocs serve
```
