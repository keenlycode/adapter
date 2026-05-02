---
name: adapter-design-system
description: Use when creating, extracting, modifying, or reviewing a reusable web UI design system organized into style, component, and pattern layers, especially with Adapter CSS class styles, component style objects, inheritance-based components, semantic design tokens, readable layouts, full-width shells with constrained inner content, or migration from page-specific CSS to reusable primitives and patterns.
---

# Adapter Design System

Use this skill to build a reusable web design system with three layers:

```text
_ui/
  style/      design tokens, global CSS, helper utilities
  component/  generic primitives built with Adapter CSS inheritance
  pattern/    composed interface patterns with explicit internal structure
```

## Core workflow

1. Start with `style/`: define semantic tokens and global CSS before styling components.
2. Add `component/` primitives for generic layout, surfaces, typography wrappers, and composition helpers.
3. Add `pattern/` modules for repeated product/UI compositions such as navbars, footers, cards, forms, pagination, and content blocks.
4. Prefer a reusable component or pattern before adding page-specific CSS.
5. Keep visual decisions semantic: consume tokens such as `colorTheme.surface`, `colorTheme.primary`, `radius.lg`, and `borderWidth.thin` instead of hard-coded values.
6. Validate with the host project’s frontend checks/builds after changes.

## Adapter CSS model

Use Adapter-style class CSS as the primary implementation mechanism:

```ts
import { css } from '../_lib/adapter.bundle.js';
import { Base } from './base.js';

export class Card extends Base {}

Card.css = css`
  display: block;
  border-radius: var(--radius-lg);
`;

Card.define('ui-card');
```

Prefer class-level style objects/templates (`Class.css = css\`...\``) over scattered page CSS. Use inheritance to share behavior:

```ts
export class Flex extends Base {}

Flex.css = css`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export class Content extends Flex {}

Content.css = css`
  width: 95%;
  max-width: 1000px;
  margin-inline: auto;
`;
```

Guidelines:
- Put base behavior in a small superclass such as `Base` or `Flex`.
- Extend primitives instead of duplicating CSS.
- Use `.define(...)` to register elements.
- Keep per-instance CSS exceptional; prefer reusable classes.
- Use contextual selectors only for meaningful relationships, such as `ui-content > ui-prose`.

## Layer responsibilities

### `style/`

Use `style/` for foundational styling:

```text
style/
  token/   semantic values: color, radius, border, spacing, typography
  css/     global CSS: base typography, image defaults, resets
  util/    CSS helpers: color transforms, fluid type, token utilities
```

Rules:
- Name tokens by role, not appearance: `primary`, `surface`, `onSurface`, `outline`, `rule`.
- Keep brand-specific values behind semantic tokens.
- Do not hard-code brand colors, radii, or border widths inside components unless there is no reusable role.

### `component/`

Use `component/` for small generic primitives:

- `ui-content`: constrains main site width.
- `ui-prose`: constrains long-form readable text.
- `ui-section`: groups semantic page/content sections.
- `ui-card`: shared surface primitive.
- `ui-grid`, `ui-flex`, `ui-inline`: layout primitives.

Rules:
- Components should be generic, composable, and feature-agnostic.
- Do not put product-specific structure in primitive components.
- Keep readable prose width separate from page/container width.

### `pattern/`

Use `pattern/` for repeatable compositions with known internal structure:

- navbar
- site footer
- pagination
- form
- news/article card
- document link
- metric/stat card
- link list

Rules:
- Patterns may be more opinionated than components.
- Patterns should still consume tokens and components.
- Keep selectors tied to explicit pattern structure.

## Layout principles

- Use full-width shells for global regions such as header and footer, then constrain inner content with `ui-content`.
- Use `ui-prose` for long-form text, not for every layout block.
- Keep page headers outside prose and center them with an explicit section variant such as `page-header`.
- Make spacing and visual hierarchy calm: prefer padding, subtle borders, and light surfaces over heavy decoration.
- Avoid making a layout narrower just to improve prose readability; constrain prose separately.

## References

Read `references/architecture.md` when you need more detailed examples or are adapting this design system pattern to another project.
