# Adapter-aware CSS-in-JS patterns

Use this reference when designing source-file structure. For detailed Adapter
runtime behavior, defer to the `adapter-framework` skill.

## Component CSS boundary

Follow the project's Adapter import path, naming convention, and the
`adapter-framework` skill's runtime guidance. Keep design-system components
focused on tokens, layers, and reuse rather than redefining Adapter API rules.

A minimal component shape often looks like:

```ts
import { Adapter, css } from "../../_lib/adapter.bundle.js";

export class Base extends Adapter {}

Base.css = css`
  display: block;
  box-sizing: border-box;
  min-width: 0;
  font: inherit;
`;
```

Extend base components by inheritance and attach only the additional CSS:

```ts
import { css } from "../../_lib/adapter.bundle.js";
import { colorTheme } from "../style/token/color.js";
import { radius } from "../style/token/shape.js";
import { Flex } from "./flex.js";

export class Card extends Flex {}

Card.css = css`
  gap: 0;
  padding: 1rem;
  border-radius: ${radius.lg};
  background: ${colorTheme.surface};
  color: ${colorTheme.onSurface};
`;
```

## ES module CSS exports

Use `*.css.ts` files for shared style modules:

```ts
import { css } from "../../../_lib/adapter.bundle.js";
import { colorTheme } from "../token/color.js";

const buttonStyleSheet = css`
  button {
    background: ${colorTheme.primary};
    color: ${colorTheme.onPrimary};
  }
`;

export { buttonStyleSheet };
```

Import these modules from the app entry point or a base stylesheet module.

## Native CSSStyleSheet and adoptedStyleSheets

Use native constructable stylesheets for document-level CSS that should be
adopted by the page:

```ts
import { typographyStyleSheet } from "./_ui/style/css/typography.css.js";
import { buttonStyleSheet } from "./_ui/style/css/button.css.js";

const baseStyleSheet = new CSSStyleSheet();

baseStyleSheet.replaceSync(`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
  }
`);

document.adoptedStyleSheets.push(
  baseStyleSheet,
  typographyStyleSheet,
  buttonStyleSheet,
);
```

If the Adapter `css` helper already returns a `CSSStyleSheet` in the project,
export and adopt those sheets directly. If it returns another framework-specific
value, follow the project's existing adapter conventions.

## Rules of thumb

- Use `CSSStyleSheet()`/`adoptedStyleSheets` for document-level defaults.
- Use Adapter component styling according to the `adapter-framework` skill and
  project conventions.
- Export CSS from ES modules so tokens, utilities, and components can import
  each other.
- Keep component CSS dependent on tokens/utilities, not raw repeated values.
- Prefer Adapter inheritance before copying CSS.
- Keep global element selectors out of component files unless the component
  intentionally owns its subtree.
