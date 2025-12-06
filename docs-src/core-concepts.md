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

---

## 2. CSS Inheritance

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

---

## 3. Programmable CSS

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

---

## 4. Style Isolation

Adapter’s main promise is: **your component styles do not collide with anything else**.

Conceptually, each component gets two protected layers of styling:

- A **shared sheet** for the component class – holds the baseline design for that tag.
- A **per-instance sheet** – holds overrides for a single element.

These sheets are attached using modern browser features so that:

- Global CSS from the host page cannot unexpectedly override your component styles.
- Styles you write for Adapter components do not leak out and affect the rest of the page.
- Even if components are injected into unknown or “messy” environments (dashboards, CMSes, AI-generated pages), they keep looking the way you designed them.

When you think “style isolation” with Adapter, think **small CSS islands**: each component and each instance has its own safe space where rules are applied and resolved.

---

## 5. Use with Shadow DOM

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

---

## 6. Putting it together

When you design with Adapter, keep these questions in mind:

- *Class or object?* – Is this a reusable style (class) or a one-off tweak (object)?
- *Should this be inherited?* – If multiple components share a look, make a base class and let CSS flow down.
- *Can I compute this?* – If you see repetition, extract tokens or helper functions and generate the CSS.
- *Is this isolated enough?* – Remember that Adapter gives you per-component and per-instance islands, and you can add Shadow DOM when you need structural isolation too.

These concepts matter more than any single API. Once you think in terms of **class vs object**, **inheritance**, **programmable CSS**, **isolation**, and **Shadow DOM compatibility**, Adapter becomes a flexible, predictable way to style Web Components in any environment.
