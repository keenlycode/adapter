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

This mixin provides APIs to style HTMLElement

<el-blockquote>

> 📍 `AdapterMixin` doesn't include CSS processor like `Adapter`,
> It has to be manually set by `cssProcess()` function.
> [Stylis](https://stylis.js.org/) is recommended.

</el-blockquote>

<el-code-block>
<div el="bar-top-left"><b>APIs in Typescript</b></div>

```js
function AdapterMixin(HTMLElement) {
  return class _Adapter extends HTMLElement {
    static cssProcess(css: string): string;

    static set css(string);
    static get css(): string;

    static get tagName(): string | undefined;

    static addStyle(css: string);

    static define(string);

    set css(string);
    get css(): string;

    addStyle(css: string);

    connectedCallback();

    remove();
  }
}
```

</el-code-block>