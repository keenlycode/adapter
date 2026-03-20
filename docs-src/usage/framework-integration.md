# Framework Integration

Adapter components are plain Web Components, so the integration story is mostly about custom element registration and attribute/property access.

## General Rules

Across frameworks, the same habits keep things simple:

- define custom elements once near app startup
- use kebab-case tag names
- pass simple one-off style overrides through the `css` attribute when that is enough
- use refs when you need imperative instance access
- keep component defaults in class-level Adapter CSS, not in framework glue

## Vanilla HTML and JavaScript

```ts
import { Adapter } from "@devcapsule/adapter";

class Card extends Adapter {}

Card.css = `
  display: block;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid currentColor;
`;

Card.define("ui-card");
```

```html
<ui-card>
  <h2>Hello Adapter</h2>
  <p>This card is rendered by a Web Component.</p>
</ui-card>
```

This is the most direct environment and the easiest place to reason about Adapter behavior.

## React

React can render Adapter-based custom elements with minimal glue.

Define the element once:

```ts
import { Adapter } from "@devcapsule/adapter";

export class Card extends Adapter {
  static {
    this.css = `
      display: block;
      padding: 1rem;
      border-radius: 0.5rem;
      border: 1px solid currentColor;
    `;
  }
}

Card.define("ui-card");
```

Import that module near the app root once:

```ts
import "./components/ui-card";
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
```

Use it in JSX:

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

- simple string overrides work well as attributes
- for imperative instance access, use `ref`
- for non-string data, prefer DOM properties or events through refs instead of overloading attributes

## Vue

Vue 3 works well with custom elements once you mark the relevant tag family as custom elements.

```ts
import { createApp } from "vue";
import App from "./App.vue";
import "./components/ui-card";

const app = createApp(App);

app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith("ui-");

app.mount("#app");
```

Template usage:

```vue
<template>
  <ui-card :css="cardCss">
    <h2>Vue + Adapter</h2>
    <p>This is a Web Component card.</p>
  </ui-card>
</template>

<script setup lang="ts">
const cardCss = "border-color: teal;";
</script>
```

## Svelte

Svelte treats unknown tags as custom elements, so the main requirement is still to define the element once before use.

```ts
import "./components/ui-card";
import App from "./App.svelte";

const app = new App({
  target: document.getElementById("app")!,
});

export default app;
```

```svelte
<script lang="ts">
  let border = "dodgerblue";
</script>

<ui-card css={`border-color: ${border};`}>
  <h2>Svelte + Adapter</h2>
  <p>Styled via the css attribute.</p>
</ui-card>
```

## SSR and Hydration Notes

Adapter depends on browser styling primitives such as `CSSStyleSheet` and `adoptedStyleSheets`.

Keep in mind:

- define custom elements on the client before hydration-sensitive UI depends on them
- verify target-browser support if you need older environments
- treat Adapter as browser-runtime styling, not as a server-rendered CSS extraction system

## When To Use Framework Glue vs Adapter APIs

Prefer Adapter APIs for component styling concerns:

- class defaults
- inherited component styles
- instance overrides
- class-level `cssProcessor`

Use the framework only for:

- rendering
- state management
- event wiring
- data flow

That separation keeps Adapter predictable across environments.
