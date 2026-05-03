# Adapter design-system architecture

Use this reference when planning the system structure or explaining the framework to the user.

## Recommended folder shape

```txt
_ui/
  style/
    token/
      color.ts
      typography.ts
      shape.ts
      lift.ts
    util/
      color.ts
      typography.ts
      shape.ts
    css/
      color.css.ts
      typography.css.ts
      button.css.ts
  component/
    base.ts
    flex.ts
    grid.ts
    button.ts
    card.ts
    section.ts
    content.ts
    prose.ts
  pattern/
    navbar/
    hero/
    footer/
    form/
```

Adapt names to the project, but preserve the layered idea.

## Layer 1: tokens

Begin with small token files. Good starter tokens:

- `color`: palette tokens plus semantic theme tokens.
- `typography`: font families, size scale, weights, line heights, tracking.
- `shape`: spacing, border widths, radii, aspect ratios.
- `lift`: shadows/elevation.

Recommend a hybrid colour model:

```txt
palette: blue, gray, red, green
semantic: background, surface, text, mutedText, border, primary, onPrimary
```

Components should usually consume semantic tokens, not raw palette values.

## Layer 2: style utilities

Create utility functions when repeated CSS generation appears. Examples:

- colour fallback functions,
- responsive typography helpers,
- aspect-ratio helpers,
- focus-ring helpers.

Keep utilities small and obvious. Do not create a utility for one use.

## Layer 3: CSS modules

Use `*.css.ts` modules for reusable style sheets. These modules should export named style sheets or CSS fragments that can be imported from the app entry point.

Good CSS modules:

- `font.css.ts`
- `typography.css.ts`
- `color.css.ts`
- `button.css.ts`
- `image.css.ts`

## Layer 4: base components

Start with the smallest useful Adapter components:

- `Base`: block primitive and shared box sizing.
- `Flex`: layout primitive.
- `Grid`: grid layout primitive.
- `Button`: first interactive primitive.
- `Card`: grouped content surface.
- `Section`: page rhythm and spacing.
- `Content`/`Prose`: rich text constraints.

## Layer 5: adapters and variants

Use Adapter inheritance/composition as the main reuse mechanism. Create variants by extending base classes and adding only the delta CSS.

Prefer:

```txt
Base → Flex → Card → MetricCard
```

Avoid copying the full Card CSS into MetricCard.

## Layer 6: patterns

Use `pattern/` for repeatable compositions that have internal structure:

- navbar,
- hero,
- site footer,
- form,
- metric card,
- news card,
- pagination.

Patterns may compose multiple base components and variants. Keep component primitives in `component/`; keep page-section recipes in `pattern/`.
