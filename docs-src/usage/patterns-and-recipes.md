# Patterns and Recipes

This page is a practical cookbook for building with Adapter after you already understand the styling model.

All examples here use the supported class-level CSS patterns for this repo.

## Buttons with Variants

```ts
import { Adapter } from "@devcapsule/adapter";

class Button extends Adapter {}

Button.css = `
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

Button.addStyle(`
  &[variant="outline"] {
    background: transparent;
    color: black;
    border-color: currentColor;
  }

  &[variant="ghost"] {
    background: transparent;
    color: black;
    border-color: transparent;
  }
`);

Button.define("ui-button");
```

```html
<ui-button>Default</ui-button>
<ui-button variant="outline">Outline</ui-button>
<ui-button variant="ghost">Ghost</ui-button>
```

Use attribute selectors for reusable variants instead of one-off instance CSS.

## Base Components with Inheritance

```ts
class BaseCard extends Adapter {
  static {
    this.css = `
      display: block;
      padding: 1rem;
      border-radius: 0.75rem;
      border: 1px solid rgba(15, 23, 42, 0.12);
      background: white;
    `;
  }
}

class WarningCard extends BaseCard {
  static {
    this.css = `
      border-color: #f97316;
      background: #fff7ed;
    `;
  }
}

BaseCard.define("base-card");
WarningCard.define("warning-card");
```

Use this pattern when multiple components share layout, spacing, or typography.

## One-Off Instance Overrides

Use this only when one specific element should differ from the class default.

### Via property

```ts
const card = document.createElement("warning-card") as InstanceType<typeof WarningCard>;

card.css = `
  border-color: seagreen;
  background: #f0fff4;
`;

document.body.append(card);
```

### Via attribute

```html
<warning-card css="border-color: hotpink;"></warning-card>
```

Do not use instance CSS as the main design-system API for a component.

## Nested Selectors and Internal Content

```ts
class Dialog extends Adapter {}

Dialog.css = `
  display: block;
  padding: 1.5rem;
  border-radius: 0.75rem;
  background: white;
`;

Dialog.addStyle(`
  h2 {
    margin: 0 0 0.5rem;
    font-size: 1.2rem;
  }

  footer {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;

    & ui-button[variant="ghost"] {
      opacity: 0.75;
    }

    & ui-button + ui-button {
      margin-inline-start: 0.25rem;
    }
  }
`);

Dialog.define("ui-dialog");
```

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

Adapter writes shared class CSS under the registered tag name when you call `define(...)`. That means first-level selectors here can be written either with `&` or without it.

- `h2 { ... }` and `footer { ... }` are scoped under `ui-dialog`
- `& h2 { ... }` would also work and means the same thing at that first level
- once you nest inside another block such as `footer { ... }`, use `&` for relative selectors like `& ui-button`

This keeps internal content styling scoped to the component without repeating the custom element tag in every rule. If your project needs nonstandard transforms, use `cssProcessor` or verify browser support first.

## `AdapterMixin` with Existing Components

```ts
import { AdapterMixin } from "@devcapsule/adapter";

class Focusable extends HTMLElement {
  connectedCallback() {
    super.connectedCallback?.();
    this.tabIndex = 0;
  }
}

class IconButton extends AdapterMixin(Focusable) {
  static {
    this.css = `
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
    `;
  }
}

IconButton.define("ui-icon-button");
```

Use this when replacing the base class with `Adapter` would break existing behavior.

## Branching `cssProcessor` Configuration

```ts
const minify = (strings: TemplateStringsArray, ...values: unknown[]) => {
  const raw = String.raw({ raw: strings }, ...values);
  return raw.replace(/\s+/g, " ").trim();
};

const annotate = (strings: TemplateStringsArray, ...values: unknown[]) => {
  const raw = String.raw({ raw: strings }, ...values);
  return `/* processed */ ${raw}`;
};

class Tag extends Adapter.configure({ cssProcessor: minify }) {}
Tag.css = `
  display: inline-flex;
  gap: 0.25rem;
`;

class DebugTag extends Tag.configure({ cssProcessor: annotate }) {}
DebugTag.css = `
  color: crimson;
`;
```

Use `configure(...)` when you want a new class branch with inherited defaults plus an explicit override.

## Hostile CSS Environments

Adapter works well in dashboards, CMS pages, plugins, and embeds where surrounding CSS is unpredictable.

Good habits:

- namespace custom tags such as `ui-` or `ac-`
- keep base styling at the class level
- reserve instance CSS for local overrides
- prefer attribute-driven variants over global class names

This keeps the component contract clear even when the host page is messy.
