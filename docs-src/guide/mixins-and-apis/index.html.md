# Mixins and APIs

In JavaScript, a mixin is a way to reuse a set of functionalities
across multiple objects or classes. It allows you to compose objects
or classes with behavior from multiple sources, enhancing modularity
and code reuse. Read more at [Typescript Mixin](https://www.typescriptlang.org/docs/handbook/mixins.html)

**Adapter** carefully designed component functionalities and put them into
separate classes which can be mixed and matched together based on use case.
This can reduced javascript code size in production by using
javascript build tools.

## AdapterMixin
---

This mixin provides APIs to style HTMLElement

<el-blockquote>

> 📍 `AdapterMixin` doesn't include CSS processor like `Adapter`,
> It has to be manually set by `cssProcess()` function.
> Adapter use [Stylis](https://stylis.js.org/) as the default CSS processor.

</el-blockquote>

### APIs

<el-code-block>
<div el="bar-top-left"><b>APIs in Typescript</b></div>

```js
function AdapterMixin(HTMLElement) {
  return class _Adapter extends HTMLElement {
    /** APIs for Component class */

    static cssProcess(css: string): string;

    static set css(string);
    static get css(): string;

    static get tagName(): string | undefined;

    static addStyle(css: string);

    static define(string);

    /** APIs for element (Component object) */

    set css(string);
    get css(): string;

    addStyle(css: string);

    connectedCallback();

    remove();
  }
}
```
</el-code-block>

### Usage

<el-code-block>
<div el="bar-top-left"><b>Javascript</b></div>

```js
import {
  AdapterMixin,
  stylis
} from 'https://cdn.jsdelivr.net/npm/@devcapsule/adapter/+esm';

class Card extends AdapterMixin(HTMLElement) {
  static cssProcess(css) {
    return stylis(css);
  }

  static css = `
    background-color: grey;
    border: 1px solid;
    border-radius: 10px;
  `;

  /** Override if needed */
  connectedCallback() {
    super.connectedCallback();
    /** Your codes */
  }

  /** Override if needed */
  remove() {
    /** Your codes */
    super.remove();
  }
};

/** Same as setting static css */
Card.css = `
  background-color: grey;
  border: 1px solid;
  border-radius: 10px;
`;

/** Additional CSS, last style win */
Card.addStyle(`color: black;`);

/** Register defined CSS with a tagName and Component. */
Card.define('el-card')

const card = new Card();
/** Element CSS which always win Class CSS. */
card.css = `color: blue;`

/** Additional element CSS, last style win. */
cadd.addStyle(`color: yellow;`)
```