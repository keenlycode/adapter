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
<div el="bar-top-left"><b>Javascript</b></div>

```js
import {
  Adapter,
  stylis
} from 'https://cdn.jsdelivr.net/npm/@devcapsule/adapter/+esm';

class Adapter extends AdapterMixin(HTMLElement) {
  static cssProcess(css) {
    return stylis(css);
  }
};
```
</el-code-block>

### `static cssProcess(css): string`

### `static css: string`

### `static addStyle(css: string)`

### `static define(tagName: string)`

## Isolator Mixin
---
Isolate web component with Shadow DOM

```js
import { IsolatorMixin } from 'https://cdn.jsdelivr.net/npm/@devcapsule/adapter/+esm';

class Adapter extends IsolatorMixin(HTMLElement) {};
```

### `isolate(mode: ShadowRootMode = 'open'): HTMLElement`