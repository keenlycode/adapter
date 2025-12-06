# Adapter

Fast. Clean. Isolated. Compact. Web Component styling that just works.

Adapter makes UI development peaceful again.
It gives you clean, isolated CSS without special tools, without new syntax, and without fighting with global styles.
Your components look exactly the way you design them — anywhere they run.

---

## Why Adapter?

### CSS that never collides

Every component gets its own safe styling space.
No more mystery overrides from global CSS, legacy systems, or other frameworks.

**Your UI stays predictable, stable, and easy to debug.**

---

### Drop into any stack

React, Vue, Svelte, Lit, Deno, Bun, or plain JS —
Adapter works with everything, and it never locks you in.

**Perfect for:**

* mix-and-match frontend stacks
* plugin architectures
* micro-frontends
* embedded UI

Adapter components are just native Web Components.
They run anywhere.

---

### Made for widgets, plugins, and AI-driven UI

When you embed UI into other systems (chatbots, workflow panels, extensions, etc.),
global CSS becomes unpredictable.

Adapter ensures:

* your styles never leak
* external CSS can’t break your components
* the host app can’t interfere

Drop an Adapter component into any environment — it just works.

---

### No build step, no new syntax

Write normal CSS.
Use nesting, selectors, hover, children — everything you already know.

Adapter applies encapsulation behind the scenes.
No preprocessors, no bundler config, no mental overhead.

**Developers can adopt it instantly.**

---

### Compact and lightweight

Adapter is extremely small (≈ 2 kB gzipped). It loads instantly, adds almost no runtime overhead, and keeps your bundle lean — crucial for modern web apps, embedded widgets, and performance-sensitive environments.

---

### Built for long-term maintainability

Styles live with the component.
No global cascade.
No naming conventions to memorize.
No creeping side effects.

Perfect for long-running systems, enterprise dashboards, or internal tools that grow over time.

---

### One UI system for every platform

Adapter components run everywhere:

* Web apps
* Internal tools
* Electron / Tauri
* Browser extensions
* Mobile webviews
* Desktop/web hybrids
* Third-party integrations

**One codebase → all environments.**

---

## What developers get

* clean, readable CSS
* automatic style isolation
* safe embedding into any host page
* framework-agnostic components
* scalable, maintainable UI
* low bundle size and fast performance

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

### Design systems

Reusable components with predictable styling and clean inheritance.

### Internal tools & dashboards

Stable, maintainable UIs even as your team and codebase grow.

### Automation & AI surfaces

Render UI safely from bots, workflows, or server-generated pages.

### Plugins & embeddable widgets

Drop custom UI into other systems without worrying about their CSS.

---

## Ready to try Adapter?

* **Read the Guide:** [https://keenlycode.github.io/adapter/guide/intro/](https://keenlycode.github.io/adapter/guide/intro/)
* **Quickstart Example:** [https://keenlycode.github.io/adapter/guide/quickstart/](https://keenlycode.github.io/adapter/guide/quickstart/)
* **GitHub:** [https://github.com/keenlycode/adapter](https://github.com/keenlycode/adapter)
