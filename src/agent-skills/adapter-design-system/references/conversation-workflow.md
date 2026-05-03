# Conversation workflow

Use this reference when the user is planning a new design system or learning the architecture.

## Start with alignment

Begin with a compact explanation:

```txt
I suggest we build this in layers: tokens, style utilities, CSS modules, base components, adapters/variants, then patterns. This keeps the system easy to understand and maintain.
```

Then ask a question with suggestions:

```txt
For the first step, I recommend starting with tokens.

Options:
1. Use your existing brand values.
2. Create a neutral starter palette and typography scale.
3. Mirror an existing design system in this repo.

Recommended: use existing brand values if available; otherwise create a neutral starter set. Which should we do?
```

## Suggested step-by-step prompts

### Tokens

```txt
Let's define tokens first because every later component should depend on named design decisions instead of raw values.

I suggest starting with:
1. colour: palette plus semantic aliases,
2. typography: family, size, weight, line height,
3. shape: spacing, radius, border width,
4. lift: shadows/elevation.

Recommended: start with colour and typography, then add shape/lift only as components need them. Does that fit your project?
```

### CSS modules

```txt
Next, we can create CSS modules as ES modules. These are useful for global defaults like typography, buttons, images, and app colour variables.

Options:
1. Use native CSSStyleSheet() and document.adoptedStyleSheets.
2. Export Adapter css fragments only.
3. Use both: CSSStyleSheet for document-level styles and Adapter css for components.

Recommended: use both, because global styles and component styles have different lifecycles. Should we follow that?
```

### Base components

```txt
For base components, I recommend starting small.

Starter set:
1. Base: shared block primitive,
2. Flex: layout primitive,
3. Grid: layout primitive,
4. Card: surface primitive,
5. Button: interactive primitive.

Recommended: Base + one layout component + one visible component first. Which visible component should we use to prove the pattern: Button or Card?
```

### Patterns

```txt
Patterns should come after components. A pattern is a repeatable composition with internal structure, not just a styled element.

Options:
1. Navbar,
2. Hero,
3. Footer,
4. Card list.

Recommended: choose the first pattern that appears on multiple pages. Which one is most useful for this project?
```

## Teaching after implementation

After each layer, explain:

- what was created,
- why it belongs in that layer,
- how to add one more item later,
- when not to extend this layer.

Keep explanations short and practical.
