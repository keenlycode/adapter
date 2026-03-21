# `cssProcessor`

`cssProcessor` is Adapter's class-level hook for transforming shared component CSS before it is written into the shared stylesheet.

This is where custom processing belongs when you want to shape class CSS once and reuse the result across every instance of the component.

## What It Receives

`cssProcessor` uses the same call shape as a tagged template function:

```ts
type CssProcessor = (
  strings: TemplateStringsArray,
  ...values: unknown[]
) => string;
```

Adapter passes the final shared class CSS through that hook right before it updates the component stylesheet.

## When It Runs

`cssProcessor` applies to shared class CSS such as:

- `Class.css = ...`
- `static { this.css = ... }`
- `Class.addStyle(...)`

It does not apply to:

- `element.css`
- the `css` attribute on instances

Set it before `define(...)` so the class stylesheet is built with the processor you expect.

## Basic Example

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
  gap: 0.25rem;
`;

Tag.define("ui-tag");
```

Use this when you want a single class-wide transform such as minification, annotation, or compatibility processing.

## Using PostCSS

`cssProcessor` can be used with PostCSS as long as the processor returns a string.

The simplest pattern is to wrap a PostCSS pipeline and return the processed CSS:

```ts
import postcss from "postcss";
import nesting from "postcss-nesting";
import autoprefixer from "autoprefixer";
import { Adapter } from "@devcapsule/adapter";

const processor = postcss([nesting(), autoprefixer()]);

const withPostCSS = (strings: TemplateStringsArray, ...values: unknown[]) => {
  const raw = String.raw({ raw: strings }, ...values);
  return processor.process(raw, { from: undefined }).css;
};

class Card extends Adapter.configure({ cssProcessor: withPostCSS }) {}

Card.css = `
  display: grid;

  & > header {
    display: flex;
    align-items: center;
  }
`;

Card.define("ui-card");
```

This is a good fit when your project already uses PostCSS and you want Adapter class CSS to pass through the same nesting, prefixing, or normalization rules.

## Branching With `configure(...)`

If one component family should use one processor and another branch should use a different one, use `configure(...)`:

```ts
class BaseTag extends Adapter.configure({ cssProcessor: minify }) {}

class DebugTag extends BaseTag.configure({
  cssProcessor(strings, ...values) {
    const raw = String.raw({ raw: strings }, ...values);
    return `/* debug */ ${raw}`;
  }
}) {}
```

This keeps the choice at the class level instead of mixing different processing rules into instances.

## Constraints

- `cssProcessor` is class-level only
- set it before `define(...)`
- return a string
- keep the processing synchronous in the code you assign to Adapter

If your PostCSS setup is async, run that work earlier in your build pipeline instead of inside Adapter at runtime.

## When To Reach For It

- you want to minify or annotate class CSS
- you want Adapter class CSS to pass through PostCSS plugins
- you want different component branches to use different class-level processing rules

If you only need to style one instance differently, use `element.css` instead.
