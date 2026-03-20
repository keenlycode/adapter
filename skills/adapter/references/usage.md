# Adapter Usage

Use this file when you need practical Adapter patterns for `@devcapsule/adapter` as an installed package.

Treat this file as the main quick-reference for npm/package usage.
For longer explanations and examples, read:

- `https://keenlycode.github.io/adapter/`
- `docs-src/usage/getting-started.md`
- `docs-src/usage/core-concepts.md`
- `docs-src/usage/patterns-and-recipes.md`
- `docs-src/usage/caveats-and-constraints.md`

## Installation

- npm / bundlers

```bash
npx jsr add @devcapsule/adapter
```

```ts
import { Adapter } from "@devcapsule/adapter";
```

- JSR / Deno

```ts
import { Adapter } from "jsr:@devcapsule/adapter";
```

- browser ESM via CDN

```ts
import { Adapter } from "https://cdn.jsdelivr.net/npm/@devcapsule/adapter/+esm";
```

For npm usage, prefer the `jsr add` flow because it matches the package's documented compatibility path.
For users outside this repo, point to the public docs site as the main reference: `https://keenlycode.github.io/adapter/`.

## API cheat sheet

- `Adapter`
  Base class for custom elements that can extend `HTMLElement` directly.
- `AdapterMixin(Base)`
  Mixin form for existing `HTMLElement` subclasses when the inheritance chain must be preserved.
- `Class.configure({ cssProcessor })`
  Creates a new subclass branch with inherited config plus explicit overrides.
- `Class.css = ...`
  Replaces the shared class-level CSS for that class.
- `static { this.css = ... }`
  Supported in-class way to define shared class-level CSS.
- `Class.addStyle(...)`
  Appends more shared class-level CSS.
- `instance.css = ...`
  Replaces the scoped CSS for one specific element instance.
- `instance.addStyle(...)`
  Appends more scoped CSS for one specific element instance.
- `Class.define(tagName)`
  Preferred Adapter API for registering the custom element and initializing its shared stylesheet.
- `Class.adapter.cssProcessor`
  Class-level hook that transforms shared class CSS before it is compiled into the shared stylesheet.

## Recommended package usage flow

1. Install and import `Adapter` or `AdapterMixin`.
2. Define shared component CSS with `Class.css = ...` or `static { this.css = ... }`.
3. Register the element with `Class.define(tagName)`.
4. Use `instance.css` only for per-instance overrides.
5. Use `Class.configure({ cssProcessor })` when class-level configuration should be declared at the subclass boundary.

## Quick start

```ts
import { Adapter } from "@devcapsule/adapter";

class Card extends Adapter {
  static {
    this.css = `
      display: block;
      padding: 1rem;
      border: 1px solid currentColor;
      border-radius: 0.5rem;
    `;
  }
}

Card.define("ui-card");
```

For class-level CSS, use `Class.css = ...` after the class or `static { this.css = ... }` inside the class body.
Do not rely on `static css = ...` class fields here, because that form does not reliably route through Adapter's static `css` accessor in this repo.

This is the safest default explanation for npm/package users.

## configure

`Class.configure(...)` is the branch-level class configuration API.

Use it when a subclass should inherit Adapter behavior and also carry an explicit class-level configuration such as `cssProcessor`.

```ts
class Tag extends Adapter.configure({ cssProcessor: minify }) {}

class WarningTag extends Tag.configure({ cssProcessor: annotate }) {}
```

This is the preferred declaration-time pattern when configuration belongs to the class branch instead of a later assignment.

Subclasses inherit the configured behavior by default, and another `configure(...)` call can override it for a new subclass branch.

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

Explain this as the default styling layer for the component.

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

For package users, keep the explanation simple:

- class-level CSS is the main component API
- instance-level CSS is the exception path

## Inheritance

Adapter follows JavaScript inheritance for shared styles.

```ts
class BaseCard extends Adapter {
  static {
    this.css = `
      display: block;
      padding: 1rem;
      border-radius: 0.5rem;
    `;
  }
}

BaseCard.define("base-card");

class WarningCard extends BaseCard {
  static {
    this.css = `
      border: 1px solid orange;
      background: #fff7ed;
    `;
  }
}

WarningCard.define("warning-card");
```

Child classes inherit parent class styles automatically, then add their own.

This is also how `configure(...)` should be explained: class behavior flows down the inheritance chain unless a subclass branch overrides it explicitly.

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
  static {
    this.css = `
      display: inline-flex;
      gap: 0.25rem;
    `;
  }
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

You can also declare it at the subclass boundary:

```ts
class Tag extends Adapter.configure({ cssProcessor: minify }) {}
```

Use it when you need to transform class CSS before it reaches the shared stylesheet.

Do not describe it as an instance-level styling hook.

## Shadow DOM

Adapter supports elements placed under a shadow root. When an Adapter element connects, it registers its shared and instance styles on the current root node's `adoptedStyleSheets`.

When explaining this behavior, keep it concrete:

- shared stylesheet for the component class
- separate stylesheet for the individual element instance
- both attached when the element connects
