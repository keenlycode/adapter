# Adapter Usage

Use this file when you need practical Adapter patterns or short examples.

## Quick start

```ts
import { Adapter } from "@devcapsule/adapter";

class Card extends Adapter {
  static css = `
    display: block;
    padding: 1rem;
    border: 1px solid currentColor;
    border-radius: 0.5rem;
  `;
}

Card.define("ui-card");
```

## Shared component styles

Use class-level CSS for shared component rules.

```ts
class Button extends Adapter {}

Button.css = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
`;

Button.addStyle(`
  &[data-variant="outline"] {
    border: 1px solid currentColor;
    background: transparent;
  }
`);

Button.define("ui-button");
```

Use this for:

- layout
- typography
- reusable selectors driven by attributes, classes, or state
- reusable base styles

## Instance-specific overrides

Use instance styles only when one element should differ from the class default.

Via property:

```ts
const card = document.createElement("ui-card") as Card;
card.css = `
  border-color: hotpink;
`;
document.body.append(card);
```

Via attribute:

```html
<ui-card css="border-color: hotpink;"></ui-card>
```

Use this for:

- local tweaks
- demo examples
- runtime customization for one element

Do not use instance CSS as the default way to define the component's design system.

Attribute selectors are only one API pattern. Adapter also works with class selectors and other normal CSS selectors.

## Inheritance

Adapter follows JavaScript inheritance for shared styles.

```ts
class BaseCard extends Adapter {
  static css = `
    display: block;
    padding: 1rem;
    border-radius: 0.5rem;
  `;
}

BaseCard.define("base-card");

class WarningCard extends BaseCard {
  static css = `
    border: 1px solid orange;
    background: #fff7ed;
  `;
}

WarningCard.define("warning-card");
```

Child classes inherit parent class styles automatically, then add their own.

## AdapterMixin

Use `AdapterMixin` when you already have a custom base element.

```ts
import { AdapterMixin } from "@devcapsule/adapter";

class Focusable extends HTMLElement {
  connectedCallback() {
    super.connectedCallback?.();
    this.tabIndex = 0;
  }
}

class IconButton extends AdapterMixin(Focusable) {
  static css = `
    display: inline-flex;
    gap: 0.25rem;
  `;
}

IconButton.define("ui-icon-button");
```

Choose `AdapterMixin` over `Adapter` when replacing the base class would break existing behavior.

## cssProcessor

`adapter.cssProcessor` is a class-level hook.

```ts
const minify = (strings: TemplateStringsArray, ...values: unknown[]) => {
  const raw = String.raw({ raw: strings }, ...values);
  return raw.replace(/\s+/g, " ").trim();
};

class Tag extends Adapter {}
Tag.adapter.cssProcessor = minify;
Tag.css = `
  display: inline-flex;
  gap: 0.25rem;
`;
Tag.define("ui-tag");
```

Use it when you need to transform class CSS before it reaches the shared stylesheet.

## Shadow DOM

Adapter supports elements placed under a shadow root. When an Adapter element connects, it registers its shared and instance styles on the current root node's `adoptedStyleSheets`.

When explaining this behavior, keep it concrete:

- shared stylesheet for the component class
- separate stylesheet for the individual element instance
- both attached when the element connects
