# Core Concepts

This chapter focuses on how to **think about Adapter CSS**, not on internal classes or framework APIs.

If you understand the ideas below, you can use Adapter comfortably in any project.

---

## 1. Class & Object

Adapter treats styling the same way JavaScript treats objects and classes:

- **Class-level style** – what every instance of a component shares.
- **Object-level style** – what only one specific instance should have.

You work with two simple layers:

- On the **class** (`MyElement`):
  - `static css` → the default look for all instances.
  - optional extra class styles (conceptually similar to “variants” or “themes”).

- On the **object** (`myElement`):
  - `myElement.css` or the `css` attribute → one-off overrides for that element.

Think of it like this:

- The class defines **what this kind of thing looks like**.
- Each object can say **and here is how I am a little different**.

This is the core mental model for Adapter: one shared, reusable style definition plus optional per-instance customization.

Example:

```ts
import { Adapter } from "@devcapsule/adapter";

class Card extends Adapter {
  // Class-level style: shared by all <ui-card> elements.
  static css = `
    display: block;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid rgba(0, 0, 0, 0.12);
    background: white;
  `;
}

Card.define("ui-card");

// Later, for one specific card instance:
const special = document.createElement("ui-card") as Card;

// Object-level style: applies only to this element.
special.css = `border-color: hotpink;`;

document.body.append(special);
```

---

## 2. AdapterMixin (compose with existing bases)

`Adapter` is a ready-to-use base class, but sometimes you already have your own element base (for focus management, accessibility helpers, framework mixins, etc.). `AdapterMixin` lets you **add Adapter’s styling model to any HTMLElement subclass** without changing the rest of your inheritance chain.

When to reach for it:

- You already have a base element with lifecycle logic and want Adapter’s styling on top.
- You need Adapter behavior on a subclass of a framework/base class that itself extends `HTMLElement`.
- You want to keep a single inheritance chain instead of introducing a new root class.

Usage pattern:

```ts
import { AdapterMixin } from "@devcapsule/adapter";

// Your existing base class with behavior you need to keep.
class Focusable extends HTMLElement {
  connectedCallback() {
    super.connectedCallback?.();
    this.tabIndex = 0;
  }
}

// Add Adapter features via the mixin.
class IconButton extends AdapterMixin(Focusable) {
  static css = `
    display: inline-flex;
    gap: 0.25rem;
    align-items: center;
    padding: 0.5rem 0.75rem;
    border-radius: 999px;
    background: #111827;
    color: white;
  `;
}

IconButton.define("ui-icon-button"); // Same define step as Adapter

// Extends normally and inherits styles just like Adapter-based classes.
class PrimaryIconButton extends IconButton {
  static css = `
    background: #2563eb;
  `;
}

PrimaryIconButton.define("ui-primary-icon-button");
```

Things to remember:

- `AdapterMixin` classes expose the same API as `Adapter` (`static css`, `addStyle`, instance `css`, etc.).
- Call `.define(tagName)` (or `customElements.define`) on each class you want registered.
- Inheritance works the same way: subclasses pick up parent styles and can add their own.

---

## 3. CSS Inheritance

Adapter lets CSS follow your JavaScript inheritance.

When you extend a component class, the child automatically **inherits the parent’s styles**, then can add or override its own.

Example idea:

- `BaseCard` defines layout, padding, and typography.
- `InfoCard` extends `BaseCard` and only adds accent colors.
- `WarningCard` extends `BaseCard` and only changes borders and background.

Conceptually:

- You no longer copy-paste CSS between components.
- Style reuse happens the same way as method reuse: by extending classes.
- If you change `BaseCard`’s CSS, every card that extends it automatically picks up the change.

Adapter takes care of merging inherited styles in the right order so that more specific components win over base components, just like you would expect.

Example:

```ts
class BaseCard extends Adapter {
  static css = `
    display: block;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid rgba(0, 0, 0, 0.12);
    background: white;
  `;
}

BaseCard.define("base-card");

// Inherits BaseCard styles, then adds its own.
class InfoCard extends BaseCard {
  static css = `
    border-color: #2563eb;
  `;
}

InfoCard.define("info-card");

// Also inherits BaseCard styles, but uses different accents.
class WarningCard extends BaseCard {
  static css = `
    border-color: #f97316;
    background: #fffbeb;
  `;
}

WarningCard.define("warning-card");
```

If you later change the padding or typography in `BaseCard.css`, both `info-card` and `warning-card` will update automatically.

---

## 4. Programmable CSS

With Adapter, CSS is not a static file; it is **data you can compute**.

You still write normal CSS syntax, but you can:

- Build CSS strings from variables and functions.
- Share token helpers (colors, spacing, radii) across components.
- Turn repeated patterns into small utilities.

Typical patterns:

- **Tokens in code** – define `primaryColor`, spacing scales, or font sizes in JS/TS and interpolate them into your CSS.
- **Composable snippets** – write small functions that return CSS snippets for things like buttons or cards, and reuse them in multiple components.
- **Conditional styles** – decide which CSS to include based on environment, feature flags, or props, then assign the resulting string to `static css` or `element.css`.

The key idea: you keep full control over CSS syntax, while JavaScript helps you **generate, reuse, and organize** it.

Example:

```ts
const primary = "#2563eb";
const radius = "999px";

// Reusable snippet for any pill-shaped button.
const pillButton = (bg: string, color: string) => `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: ${radius};
  background: ${bg};
  color: ${color};
`;

class PrimaryButton extends Adapter {
  static css = pillButton(primary, "white");
}

PrimaryButton.define("ui-primary-button");
```

You can build larger design systems out of small helpers like `pillButton`, without sacrificing readable CSS.

---

## 5. Class-level CSS processors (`adapter.cssProcessor`)

Adapter lets you run a **single processor for all class-level CSS** on a component. Set `MyComponent.adapter.cssProcessor` to any tagged template function; Adapter will call it when compiling the shared stylesheet for that class (including inherited styles).

- It runs only for class-level CSS (`static css`, `addStyle`, inherited blocks).
- Per-instance styles set via `element.css` bypass this hook.
- Set it **before** calling `define()`.

Example: minify class CSS while leaving instance overrides untouched.

```ts
import { Adapter } from "@devcapsule/adapter";

const minify = (strings: TemplateStringsArray, ...values: unknown[]) => {
  const raw = String.raw({ raw: strings }, ...values);
  return raw.replace(/\s+/g, " ").trim();
};

class Tag extends Adapter {}
Tag.adapter.cssProcessor = minify;

Tag.css = `
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  background: #0f172a;
  color: white;
`;

Tag.define("ui-tag");
```

This hook is handy for cross-cutting transforms (token substitution, prefixing, minification) that you want applied to the component’s shared stylesheet without changing how you write CSS in each assignment.

---

## 6. Style Isolation

Adapter’s main promise is: **your component styles do not collide with anything else**.

Conceptually, each component gets two protected layers of styling:

- A **shared sheet** for the component class – holds the baseline design for that tag.
- A **per-instance sheet** – holds overrides for a single element.

These sheets are attached using modern browser features so that:

- Global CSS from the host page cannot unexpectedly override your component styles.
- Styles you write for Adapter components do not leak out and affect the rest of the page.
- Even if components are injected into unknown or “messy” environments (dashboards, CMSes, AI-generated pages), they keep looking the way you designed them.

When you think “style isolation” with Adapter, think **small CSS islands**: each component and each instance has its own safe space where rules are applied and resolved.

Example (host page with its own global styles):

```html
<style>
  /* Host page styles that would normally leak everywhere */
  body {
    font-family: system-ui;
  }

  .card {
    border: 10px solid red; /* very aggressive */
  }
</style>

<ui-card>
  <h2 class="card">Adapter card</h2>
  <p>The host's .card class will not override the component's own rules.</p>
</ui-card>
```

Adapter writes your `ui-card` styles into isolated style sheets so that the host page’s `.card` rules cannot unexpectedly change your component’s appearance.

---

## 7. Use with Shadow DOM

Adapter works well whether you use Shadow DOM or not.

### Without Shadow DOM

If your components render in the light DOM (no `shadowRoot`), Adapter still gives you:

- Isolation from global styles via its constructable style sheets.
- A clean way to style internal markup with familiar selectors.

In many projects, this is enough: you get encapsulated styling without changing how your markup is structured.

### With Shadow DOM

If you also use Shadow DOM, Adapter complements it rather than replacing it:

- Shadow DOM controls **which DOM nodes** are visible and how slotting works.
- Adapter controls **how CSS is organized and scoped** to your elements.

In practice, this means:

- You can mount Adapter-based elements inside a shadow root; Adapter will attach its style sheets to that root.
- You can still use `::part`, `::slotted`, and other Shadow DOM features alongside Adapter’s class-level and instance-level styles.

You choose how much isolation you need:

- **Only Adapter** → simpler DOM, strong style isolation.
- **Adapter + Shadow DOM** → maximum isolation for both DOM structure and styles.

Example: using Adapter components inside another element’s shadow root:

```ts
// Define an Adapter-based card somewhere in your app.
class ShellCard extends Adapter {
  static css = `
    display: block;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid rgba(0, 0, 0, 0.12);
  `;
}

ShellCard.define("shell-card");

// A host element that uses Shadow DOM.
class Shell extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <shell-card>
        <h2>Inside a shadow root</h2>
        <p>Card styles are still isolated and applied correctly.</p>
      </shell-card>
    `;
  }
}

customElements.define("app-shell", Shell);
```

Here, `shell-card` lives inside `app-shell`’s shadow root, and Adapter attaches its style sheets to that root instead of the global document.

---

## 8. Putting it together

When you design with Adapter, keep these questions in mind:

- *Class or object?* – Is this a reusable style (class) or a one-off tweak (object)?
- *Should this be inherited?* – If multiple components share a look, make a base class and let CSS flow down.
- *Can I compute this?* – If you see repetition, extract tokens or helper functions and generate the CSS.
- *Is this isolated enough?* – Remember that Adapter gives you per-component and per-instance islands, and you can add Shadow DOM when you need structural isolation too.

These concepts matter more than any single API. Once you think in terms of **class vs object**, **inheritance**, **programmable CSS**, **isolation**, and **Shadow DOM compatibility**, Adapter becomes a flexible, predictable way to style Web Components in any environment.
