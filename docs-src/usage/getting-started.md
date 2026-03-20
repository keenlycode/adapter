# Getting Started

This guide walks you through installing Adapter, creating your first component, and understanding the basic styling model.

If you haven’t yet, read `intro.md` for the high-level concepts and motivation.

---

## 1. Install Adapter

Adapter works in browsers, Deno, and Node-based bundlers. Choose the setup that matches your project.

### CDN (browser-only, great for demos)

You can load Adapter directly from a CDN in any HTML page:

```html title="HTML"
<script type="module">
  import { Adapter } from "https://cdn.jsdelivr.net/npm/@devcapsule/adapter/+esm";
  
  // your components go here
  class HelloCard extends Adapter {}

  HelloCard.css = `
    display: block;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid currentColor;
  `;

  HelloCard.define("hello-card");
  document.body.innerHTML = "<hello-card>Hello Adapter</hello-card>";
</script>
```

### Deno / JSR

```ts title="TypeScript"
import { Adapter } from "jsr:@devcapsule/adapter";
```

### npm (Node / bundlers via JSR)

Use the official compatibility helper so npm stays in sync with the JSR release:

```bash title="Bash"
npx jsr add @devcapsule/adapter
```

This command installs the compatibility package (published as `@jsr/devcapsule__adapter`) and adds the correct alias to your `package.json`, per the [JSR npm compatibility guide](https://jsr.io/docs/npm-compatibility).

After installing you can import Adapter with its canonical name:

```ts title="TypeScript"
import { Adapter } from "@devcapsule/adapter";
```

---

## 2. Your first Adapter component

The easiest way to use Adapter is to extend the `Adapter` base class and assign a CSS string to the class itself.

```ts title="TypeScript"
import { Adapter } from "@devcapsule/adapter";

class Card extends Adapter {}

Card.css = `
  display: block;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: white;
`;

// Register the custom element
Card.define("ui-card");
```

Use it in HTML like any other custom element:

```html title="HTML"
<ui-card>
  <h2>Welcome</h2>
  <p>This card is styled by Adapter.</p>
</ui-card>
```

Behind the scenes (see `src/adapter.ts`):

- A **class controller** (`AdapterClassController`) collects the CSS assigned on the class.
- When you call `Card.define("ui-card")`, Adapter
  - registers the custom element with `customElements.define`, and
  - creates a constructable `CSSStyleSheet` shared by all `ui-card` instances.
- This stylesheet is attached via `document.adoptedStyleSheets`, so every `ui-card` shares the same base styles.

---

## 3. Class-level vs instance-level styles

Adapter gives you two main ways to style components:

1. **Class-level styles** – shared by all instances of a component.
2. **Instance-level styles** – scoped to one specific element.

### Class-level styles

Class-level styles are defined on the class itself:

```ts title="TypeScript"
class Button extends Adapter {}

Button.css = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  border: 1px solid transparent;
  cursor: pointer;
`;

Button.define("ui-button");
```

You can add more base styles later using `static addStyle`:

```ts title="TypeScript"
Button.addStyle(`
  &:hover {
    filter: brightness(1.05);
  }
`);
```

Adapter aggregates these class-level blocks and writes them into the shared class stylesheet managed by `AdapterClassController`.

### Instance-level styles via JS

Every element instance also owns its own constructable stylesheet, managed by `AdapterObjectController`.

You can style a single instance from JavaScript:

```ts title="TypeScript"
const card = document.createElement("ui-card") as InstanceType<typeof Card>;

card.css = `
  border-color: hotpink;
`;

document.body.append(card);
```

When you set `card.css`:

- Adapter ensures the element has a stable, UUID-based class name.
- It generates a selector like `ui-card.ui-card-1234 { ... }`.
- It writes that rule into the instance’s own `CSSStyleSheet`.

That stylesheet is attached to the element’s root node (`document` or shadow root) through `adoptedStyleSheets`, so the styles are local to that instance.

### Instance-level styles via the `css` attribute

You can also set styles declaratively using an attribute. Adapter observes the `css` attribute and keeps it in sync with the instance stylesheet.

```html title="HTML"
<ui-card css="border-color: rebeccapurple;">
  <h2>Styled via attribute</h2>
</ui-card>
```

In `src/adapter.ts`, `AdapterObjectController` uses a `MutationObserver` to watch for `css` attribute changes and update `element.css` automatically.

---

Next steps: read `core-concepts.md` for a deeper look at the controllers and mixin, or jump to `framework-integration.md` to see how Adapter fits into React, Vue, and other stacks.
