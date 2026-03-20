# Getting Started

This guide gets you from install to a working component, then explains the minimum styling model you need to use Adapter correctly.

## Install

Choose the setup that matches your project.

### CDN

```html
<script type="module">
  import { Adapter } from "https://cdn.jsdelivr.net/npm/@devcapsule/adapter/+esm";

  class HelloCard extends Adapter {}

  HelloCard.css = `
    display: block;
    padding: 1rem;
    border: 1px solid currentColor;
    border-radius: 0.5rem;
  `;

  HelloCard.define("hello-card");
  document.body.innerHTML = "<hello-card>Hello Adapter</hello-card>";
</script>
```

### Deno / JSR

```ts
import { Adapter } from "jsr:@devcapsule/adapter";
```

### npm / bundlers

```bash
npx jsr add @devcapsule/adapter
```

```ts
import { Adapter } from "@devcapsule/adapter";
```

## AI Skill

This repo also includes an Adapter-specific AI skill at `skills/adapter/SKILL.md`.

It is there so coding assistants can follow the actual runtime rules of this package instead of guessing from generic Web Components patterns.

## First Component

The simplest safe pattern is:

```ts
import { Adapter } from "@devcapsule/adapter";

class Card extends Adapter {
  static {
    this.css = `
      display: block;
      padding: 1rem;
      border-radius: 0.75rem;
      border: 1px solid rgba(15, 23, 42, 0.14);
      background: white;
    `;
  }
}

Card.define("ui-card");
```

Use it like any other custom element:

```html
<ui-card>
  <h2>Welcome</h2>
  <p>This card is styled by Adapter.</p>
</ui-card>
```

You can also assign class CSS after the class declaration:

```ts
class Card extends Adapter {}

Card.css = `
  display: block;
  padding: 1rem;
`;

Card.define("ui-card");
```

## Supported Class CSS Patterns

Use one of these:

```ts
class Card extends Adapter {
  static {
    this.css = `
      display: block;
    `;
  }
}
```

```ts
class Card extends Adapter {}

Card.css = `
  display: block;
`;
```

!!! danger

    Do not rely on this pattern:

    ```ts
    class Card extends Adapter {
      static css = `
        display: block;
      `;
    }
    ```

    `static css = ...` creates a class field and does not reliably trigger Adapter's static `css` accessor in the current runtime.

## Shared Styles vs Instance Overrides

Adapter gives you two styling layers.

### Shared class-level styles

These are for the component definition itself.

```ts
class Button extends Adapter {}

Button.css = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 999px;
`;

Button.addStyle(`
  &[variant="outline"] {
    border: 1px solid currentColor;
    background: transparent;
  }
`);

Button.define("ui-button");
```

### Instance-level overrides

These affect only one element.

```ts
const card = document.createElement("ui-card") as InstanceType<typeof Card>;

card.css = `
  border-color: hotpink;
`;

document.body.append(card);
```

Or declaratively:

```html
<ui-card css="border-color: hotpink;"></ui-card>
```

## What `define()` Does

When you call `Card.define("ui-card")`, Adapter:

1. registers the custom element
2. prepares the class-level stylesheet
3. compiles the current class CSS into that shared stylesheet

Every instance of `ui-card` then shares that class stylesheet.

## Next Step

Read [Core Concepts](core-concepts.md) next. That page explains the styling model, inheritance, `AdapterMixin`, and `cssProcessor` in the same terms the runtime actually uses.
