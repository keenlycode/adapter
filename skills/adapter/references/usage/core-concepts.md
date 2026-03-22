# Core Concepts

This page explains how to think about Adapter from the runtime outward, not from internal implementation details inward.

## 1. The Styling Model

Adapter separates styling into two layers:

- shared class CSS for the component
- local instance CSS for one element

The reason for that split is CSS isolation. The component class owns the shared styling contract, while one-off element overrides stay local and do not rewrite that contract for every instance.

### Class-level CSS

Shared rules for every instance of a component class.

Use:

- `Class.css = ...`
- `static { this.css = ... }`
- `Class.addStyle(...)`

### Instance-level CSS

Rules for one element only.

Use:

- `element.css = ...`
- the `css` attribute
- `element.addStyle(...)`

This is the main mental model:

- the class defines what this kind of component looks like
- an individual element can then opt into one-off differences

In practice, this means Adapter is not trying to make global CSS smarter. It is trying to keep component CSS isolated and predictable.

!!! info "Quick rule of thumb"

    Reach for class-level CSS first.

    Reach for instance CSS only when one element should diverge from the component default.

## 2. `Adapter`

`Adapter` is the default base class when your component can extend `HTMLElement` directly.

```ts
import { Adapter } from "@devcapsule/adapter";

class Card extends Adapter {
  static {
    this.css = `
      display: block;
      padding: 1rem;
      border-radius: 0.5rem;
      border: 1px solid rgba(15, 23, 42, 0.14);
    `;
  }
}

Card.define("ui-card");
```

Use `Adapter` when you want the normal Adapter styling model and do not need to preserve another custom element base class.

## 3. `AdapterMixin`

Use `AdapterMixin(Base)` when you already have a base class that extends `HTMLElement` and you want to add Adapter behavior without replacing that inheritance chain.

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
      align-items: center;
    `;
  }
}

IconButton.define("ui-icon-button");
```

`AdapterMixin` exposes the same public styling API as `Adapter`.

## 4. Shared Class CSS

Shared class CSS is where Adapter's component-level isolation starts.

The supported class-level patterns in this repo are:

```ts
class Card extends Adapter {}

Card.css = `
  display: block;
`;
```

```ts
class Card extends Adapter {
  static {
    this.css = `
      display: block;
    `;
  }
}
```

You can also add more shared rules later:

```ts
Card.addStyle(`
  &[tone="danger"] {
    border-color: crimson;
  }
`);
```

Important:

- `static css = ...` class fields should not be treated as a supported Adapter pattern here
- use `Class.css = ...` or `static { this.css = ... }` instead
- see [Caveats and Constraints](caveats-and-constraints.md) for the runtime details behind that rule

When you later call `.define(tagName)`, Adapter writes that shared CSS under the registered custom element so the rules stay attached to the component boundary.

## 5. Inheritance

Adapter follows JavaScript inheritance for shared class-level styles.

Parent class styles are collected first. Child class styles are appended after that.

```ts
class BaseCard extends Adapter {
  static {
    this.css = `
      display: block;
      padding: 1rem;
      border-radius: 0.75rem;
    `;
  }
}

class WarningCard extends BaseCard {
  static {
    this.css = `
      border: 1px solid orange;
      background: #fff7ed;
    `;
  }
}
```

`WarningCard` keeps the shared rules from `BaseCard` and adds its own class-level CSS on top.

## 6. Instance CSS

Instance CSS is for one element, not the whole component class.

```ts
const card = document.createElement("ui-card") as InstanceType<typeof Card>;

card.css = `
  border-color: hotpink;
`;
```

Or:

```html
<ui-card css="border-color: hotpink;"></ui-card>
```

Adapter scopes those rules to the specific element instance.

That separation matters: instance CSS is for local exceptions, while shared class CSS remains the stable isolated styling contract for the component.

## 7. `define(tagName)`

Use `.define(tagName)` as the normal Adapter registration API.

```ts
Card.define("ui-card");
```

That does two things:

1. calls `customElements.define(...)`
2. initializes the shared class stylesheet for the component

Examples and generated code should prefer `.define(...)` over calling `customElements.define(...)` directly.

## 8. `cssProcessor`

`cssProcessor` is a class-level hook that transforms shared class CSS before it is written into the shared stylesheet.

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

Rules:

- set it before `define()`
- it affects class-level CSS only
- it does not transform `element.css`
- it does not transform the `css` attribute on instances

!!! info "What `cssProcessor` is good at"

    Use it for class-wide transforms such as minification, annotation, nesting support, or PostCSS-based processing.

    Do not use it as a substitute for one-off element overrides.

`configure(...)` is available if you want to branch class-level config at declaration time:

```ts
class Tag extends Adapter.configure({ cssProcessor: minify }) {}
class WarningTag extends Tag.configure({ cssProcessor: otherProcessor }) {}
```

For a deeper guide, including PostCSS integration, read [`cssProcessor`](css-processor.md).

## 9. Lifecycle Constraints

If you override these methods on an Adapter-based element:

- call `super.connectedCallback()`
- call `super.remove()`

Adapter registers and removes styles in those base implementations.

## 10. What To Keep In Mind

The shortest accurate summary of Adapter is:

- small styling runtime for Web Components
- shared class styles plus per-instance overrides
- inheritance-aware class styling
- modern browser stylesheet primitives

That framing will keep your examples and explanations aligned with the runtime.
