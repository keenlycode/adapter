# Getting Started

This guide walks you through installing Adapter, creating your first component, and understanding the basic styling model.

If you haven’t yet, read `intro.md` for the high-level concepts and motivation.

---

## 1. Install Adapter

Adapter works in browsers, Deno, and Node-based bundlers. Choose the setup that matches your project.

### CDN (browser-only, great for demos)

You can load Adapter directly from a CDN in any HTML page:

```html
<script type="module">
  import { Adapter } from "https://cdn.jsdelivr.net/npm/@devcapsule/adapter/+esm";
  // your components go here
  console.log(Adapter);
  
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

```ts
import { Adapter } from "jsr:@devcapsule/adapter";
```

### npm (Node / bundlers via JSR)

Install the npm compatibility package published from JSR:

```bash
npm install @jsr/devcapsule__adapter
```

Then import it in your code:

```ts
import { Adapter } from "@jsr/devcapsule__adapter";
```

---

## 2. Your first Adapter component

The easiest way to use Adapter is to extend the `Adapter` base class and assign a CSS string to the class itself.

```ts
import { Adapter } from "@jsr/devcapsule__adapter";

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

```html
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

```ts
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

```ts
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

```ts
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

```html
<ui-card css="border-color: rebeccapurple;">
  <h2>Styled via attribute</h2>
</ui-card>
```

In `src/adapter.ts`, `AdapterObjectController` uses a `MutationObserver` to watch for `css` attribute changes and update `element.css` automatically.

---

## 4. Lifecycle: when styles are applied

You do not need to manually attach style sheets. The `Adapter` base class takes care of it:

- On construction, each element gets an `AdapterObjectController` instance.
- On `connectedCallback`, Adapter
  - ensures the class-level stylesheet is present in `rootNode.adoptedStyleSheets`, and
  - registers the instance-level stylesheet if it is not already present.
- If a `css` attribute is present, its content is applied once when the element is connected, and then kept in sync.

When an element is removed from the DOM, Adapter removes its instance stylesheet from `adoptedStyleSheets` to avoid leaks.

---

## 5. Quick troubleshooting

- **My component renders, but styles don’t apply.**
  - Make sure you called `MyElement.define("my-element")` before using `<my-element>` in HTML.
  - Confirm that your browser supports `CSSStyleSheet` and `adoptedStyleSheets`.

- **Instance styles don’t seem to work.**
  - Check that you are using the `css` property or `css` attribute exactly (lowercase).
  - For property-based styles, ensure you set `element.css = "..."` after the element is created.

- **Styles conflict with the host page.**
  - Ensure your component’s tag name is unique (e.g. prefixed with your app or company name).
  - Prefer class-level styles for shared design and instance styles only for overrides.

Next steps: read `core-concepts.md` for a deeper look at the controllers and mixin, or jump to `framework-integration.md` to see how Adapter fits into React, Vue, and other stacks.
