# Framework Integration

Adapter components are just Web Components. This means they work in many environments with minimal glue code.

This chapter shows how to use Adapter-based elements in:

- Vanilla JS / HTML
- React
- Vue
- Svelte

---

## 1. Vanilla JS / HTML

The vanilla setup is the most direct: import `Adapter`, define your element, then use it in HTML.

```ts
import { Adapter } from "@devcapsule/adapter";

class Card extends Adapter {
  static css = `
    display: block;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid currentColor;
  `;
}

Card.define("ui-card");
```

```html
<ui-card>
  <h2>Hello Adapter</h2>
  <p>This card is rendered by a Web Component.</p>
</ui-card>
```

You can also define the element from a `<script type="module">` tag when using a CDN, as shown in `getting-started.md`.

---

## 2. React

React can render Web Components as long as you follow a few conventions:

- Use **kebab-case** tag names (e.g. `ui-card`).
- Pass primitive props via attributes.
- For non-string data, use refs or custom events.

### Setup

Make sure your Adapter components are defined once at app startup:

```ts
// components/ui-card.ts
import { Adapter } from "@devcapsule/adapter";

export class Card extends Adapter {
  static css = `
    display: block;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid currentColor;
  `;
}

Card.define("ui-card");
```

Then import that module somewhere near your React root (once):

```ts
// main.tsx
import "./components/ui-card";
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <App />,
);
```

### Usage in JSX

```tsx
export function Example() {
  return (
    <ui-card css="border-color: rebeccapurple;">
      <h2>React + Adapter</h2>
      <p>Rendered as a Web Component.</p>
    </ui-card>
  );
}
```

Notes:

- JSX accepts the `css` attribute as a string just like HTML.
- Events from inside the Web Component bubble like normal DOM events; you can use `onClick` on child elements or custom event listeners on the host via refs if needed.

---

## 3. Vue

Vue (2.6+ with the Web Components config, or Vue 3) works well with custom elements.

### Configure Vue to ignore custom elements (Vue 3)

```ts
import { createApp } from "vue";
import App from "./App.vue";
import "./components/ui-card"; // defines <ui-card>

const app = createApp(App);

app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith("ui-");

app.mount("#app");
```

### Use Adapter components in templates

```vue
<template>
  <ui-card css="border-color: teal;">
    <h2>Vue + Adapter</h2>
    <p>This is a Web Component card.</p>
  </ui-card>
</template>
```

Because Adapter components expose a DOM-based API (`css` attribute / property), you can control instance styles with bindings:

```vue
<template>
  <ui-card :css="cardCss">
    <slot />
  </ui-card>
</template>

<script setup lang="ts">
const cardCss = `border-color: orangered;`;
</script>
```

---

## 4. Svelte

Svelte treats unknown tags as custom elements by default, so Adapter components slot in easily.

Make sure your component definition module is imported once before use (for example, in your root file):

```ts
// main.ts
import "./components/ui-card";
import App from "./App.svelte";

const app = new App({
  target: document.getElementById("app")!,
});

export default app;
```

Then use Adapter-based elements in Svelte templates:

```svelte
<script lang="ts">
  let border = "dodgerblue";
</script>

<ui-card css={`border-color: ${border};`}>
  <h2>Svelte + Adapter</h2>
  <p>Styled via the css attribute.</p>
</ui-card>
```

Because `css` is just an attribute, normal Svelte bindings work as expected.

---

## 5. General tips

Regardless of framework, a few rules keep things smooth:

- **Define once, use anywhere**
  - Import the modules that call `MyElement.define("my-element")` exactly once per page.

- **Prefer attributes for simple styles**
  - For quick overrides, pass `css` as a string attribute or bound prop.
  - For complex logic, use imperative access via refs (React), `ref`s (Vue), or the DOM API.

- **Be mindful of SSR / hydration**
  - When server-rendering HTML, ensure the client defines Adapter components before hydrating.
  - Adapter relies on `adoptedStyleSheets`; check your target environments if you need to support very old browsers.

- **Use a unique tag prefix**
  - Namespacing (e.g. `ui-card`, `ac-button`) avoids collisions with other components on the page.

For concrete DOM and styling behavior, revisit `getting-started.md` and `core-concepts.md`, which map directly to the implementation in `src/adapter.ts`.
