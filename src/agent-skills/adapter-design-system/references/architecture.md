# Web Design System Architecture Reference

## Recommended folder structure

```text
_ui/
  README.md
  style/
    token/
      color.ts
      shape.ts
      typography.ts
      spacing.ts
    css/
      typography.css.ts
      image.css.ts
    util/
      color.ts
      typography.ts
  component/
    base.ts
    flex.ts
    content.ts
    prose.ts
    section.ts
    card.ts
    grid.ts
  pattern/
    navbar/
      navbar.ts
    site-footer/
      site-footer.ts
    form/
      form.ts
    pagination/
      pagination.ts
```

## Adapter inheritance pattern

Use a small base component as the root primitive:

```ts
import { Adapter, css } from '../_lib/adapter.bundle.js';

export class Base extends Adapter {}

Base.css = css`
  display: block;
  box-sizing: border-box;
  min-width: 0;
  font: inherit;
`;
```

Build layout primitives by inheritance:

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

Register elements in one project entry file:

```ts
Content.define('ui-content');
Prose.define('ui-prose');
Section.define('ui-section');
Navbar.define('ui-navbar');
```

## Style layer

Use semantic tokens as an API between brand/design and components:

```ts
const colorTheme = {
  background: '#f6f9fc',
  surface: '#ffffff',
  surfaceSubtle: '#f5fbfd',
  onBackground: '#00070a',
  onSurface: '#00070a',
  outline: '...',
  primary: '...',
  link: '...',
} as const;

const radius = {
  none: '0',
  sm: '0.3em',
  md: '0.5em',
  lg: '0.7em',
  xl: '0.9em',
  pill: '999rem',
} as const;
```

Components should consume roles:

```ts
Card.css = css`
  border-radius: ${radius.xl};
  ${cssColor('background-color', colorTheme.surface)}
  ${cssColor('border-color', colorTheme.outline)}
`;
```

## Component layer examples

Readable page width and prose width should be separate:

```ts
export class Content extends Flex {}

Content.css = css`
  width: 95%;
  max-width: 1000px;
  gap: 2rem;
  margin: 0 auto;
`;

export class Prose extends Base {}

Prose.css = css`
  width: 100%;
  max-width: 800px;
  margin-inline: auto;
`;
```

Add contextual treatment only where the relationship matters:

```ts
Content.css = css`
  /* base content styles */

  & > ui-prose {
    padding: 1rem 1.5rem;
    border-inline-start: 0.18rem solid;
    border-radius: ${radius.lg};
    ${cssColor('border-inline-start-color', colorTheme.primary)}
    ${cssColor('background-color', colorTheme.surfaceSubtle)}
  }
`;
```

Page header sections should be explicit:

```ts
Section.css = css`
  width: 100%;
  gap: 1rem;

  &[page-header] {
    text-align: center;
    justify-content: center;
  }
`;
```

## Pattern layer examples

Use full-width shells with constrained inner content:

```html
<ui-navbar>
  <ui-content>
    <a href="/">Brand</a>
    <nav>...</nav>
  </ui-content>
</ui-navbar>

<ui-site-footer>
  <ui-content>
    <div>Footer summary</div>
    <nav>...</nav>
  </ui-content>
</ui-site-footer>
```

Then style the pattern shell and inner content separately:

```ts
Navbar.css = css`
  width: 100%;
  padding-block: 0.9rem;
  border-block-end: 1px solid;
  ${cssColor('background-color', colorTheme.surface)}

  & > ui-content {
    align-items: center;
    gap: 1rem;
  }
`;
```

## Decision checklist

Before adding CSS, ask:

1. Is this a brand/design value? Put it in `style/token/`.
2. Is this a generic building block? Put it in `component/`.
3. Is this a repeated composition with known internals? Put it in `pattern/`.
4. Is this truly page-specific? Then use page CSS.
5. Can Adapter inheritance remove duplication?
6. Does this change keep prose width separate from layout width?
7. Are full-width regions using constrained inner content?

## Validation guidance

Run the project’s equivalent of:

```bash
deno task ui:check
deno task ui:build
```

If templates or server-rendered views change, run the project’s backend/template check too.
