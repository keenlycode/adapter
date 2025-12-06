# Patterns and Recipes

This chapter collects practical patterns for building real-world UI with Adapter.

Use it as a cookbook: skim for the scenario you need, copy the pattern, and adapt it.

---

## 1. Buttons and variants

### Basic button

```ts
import { Adapter } from "@devcapsule/adapter";

class Button extends Adapter {
  static css = `
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    border-radius: 999px;
    border: 1px solid transparent;
    cursor: pointer;
    font: inherit;
    background: black;
    color: white;
  `;
}

Button.define("ui-button");
```

### Variants via attributes

You can add variants with attribute selectors in class-level CSS.

```ts
Button.addStyle(`
  &[variant="outline"] {
    background: transparent;
    color: black;
    border-color: currentColor;
  }

  &[variant="ghost"] {
    background: transparent;
    border-color: transparent;
  }
`);
```

Usage:

```html
<ui-button>Default</ui-button>
<ui-button variant="outline">Outline</ui-button>
<ui-button variant="ghost">Ghost</ui-button>
```

Because these rules are class-level styles, they apply consistently to every instance.

---

## 2. Cards and layout

### Card component

```ts
class Card extends Adapter {
  static css = `
    display: block;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid rgba(0, 0, 0, 0.12);
    background: white;
    box-shadow:
      0 1px 2px rgba(0, 0, 0, 0.04),
      0 2px 8px rgba(0, 0, 0, 0.06);
  `;
}

Card.define("ui-card");
```

### Layout container

```ts
class Container extends Adapter {
  static css = `
    display: block;
    max-width: 960px;
    margin: 0 auto;
    padding-inline: 1rem;
  `;
}

Container.define("ui-container");
```

Usage:

```html
<ui-container>
  <ui-card>
    <h2>Inside container</h2>
    <p>Adapter makes layout components easy to reuse.</p>
  </ui-card>
</ui-container>
```

---

## 3. Instance-specific overrides

Sometimes you want one-off custom styling without adding new variants.

### Via the `css` attribute

```html
<ui-card css="border-color: hotpink;">
  <h2>Special card</h2>
  <p>Styled via the css attribute.</p>
</ui-card>
```

### Via the `css` property

```ts
const card = document.createElement("ui-card") as Card;

card.css = `
  border-color: seagreen;
  background: #f0fff4;
`;

document.body.append(card);
```

Under the hood (see `src/adapter.ts`), Adapter gives this instance its own constructable `CSSStyleSheet`, keyed by a stable UUID, and writes the rules there. Other cards are unaffected.

---

## 4. Nested content and selectors

Adapter lets you target content inside your components using normal selectors.

```ts
class Dialog extends Adapter {
  static css = `
    display: block;
    padding: 1.5rem;
    border-radius: 0.75rem;
    background: white;
  `;
}

Dialog.addStyle(`
  & h2 {
    margin: 0 0 0.5rem;
    font-size: 1.2rem;
  }

  & footer {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }
`);

Dialog.define("ui-dialog");
```

Usage:

```html
<ui-dialog>
  <h2>Confirm action</h2>
  <p>Are you sure you want to continue?</p>
  <footer>
    <ui-button variant="ghost">Cancel</ui-button>
    <ui-button>Continue</ui-button>
  </footer>
  
</ui-dialog>
```

Selectors like `& h2` are expanded by Adapter’s CSS helper into valid rules scoped to your component.

---

## 5. Hostile CSS environments

Adapter is especially useful when you embed UI into pages you don’t control: dashboards, CMSes, plugins, or AI-generated layouts.

Patterns:

- **Namespace your tags**
  - Use a prefix such as `ac-` or `ui-` for all Adapter components.

- **Keep core styles at the class level**
  - Define layout, typography, and basic tokens in `static css` and `static addStyle`.
  - Reserve instance-level `css` for overrides and local tweaks.

- **Use attributes instead of global classes**
  - Prefer selectors like `[variant="danger"]` or `[size="lg"]` rather than relying on global class names.

Because Adapter writes rules into constructable style sheets attached via `adoptedStyleSheets`, your component styles will not be polluted by the host page’s CSS, and vice versa.

---

## 6. Theming and design systems

Adapter can sit at the base of a small design system.

Common patterns:

- **Token helpers in JS/TS**
  - Create functions that return CSS strings, then feed them into `static css` or `addStyle`.

  ```ts
  const primaryColor = "#2563eb";

  const buttonBase = () => `
    border-radius: 999px;
    font-weight: 500;
  `;

  class PrimaryButton extends Adapter {
    static css = `
      ${buttonBase()}
      background: ${primaryColor};
      color: white;
    `;
  }

  PrimaryButton.define("ds-primary-button");
  ```

- **Shared layout primitives**
  - Build reusable components like `Stack`, `Inline`, `Grid` as Adapter elements and compose them in any framework.

- **Gradual adoption**
  - Start with a single Adapter component (e.g. a card or button) embedded in an existing app.
  - Expand to a small kit of primitives over time.

---

## 7. Progressive enhancement

Adapter components degrade gracefully when styles are missing or not yet applied, which makes them friendly to progressive enhancement.

Suggestions:

- Serve basic HTML content first.
- Define and register Adapter components as soon as your JS loads.
- Use Adapter for layout and polish, not for critical content visibility.

If you work in a server-rendered environment, revisit `framework-integration.md` for SSR and hydration considerations.

