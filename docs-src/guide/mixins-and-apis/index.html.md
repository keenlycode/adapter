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

This mixin provides APIs to style HTMLElement.
A component class can be created by extending class
from `AdapterMixin()` using codes below.


<el-blockquote>

> 📍 `AdapterMixin` doesn't include CSS processor like `Adapter`,
> It has to be set by `cssProcess()` function.
> Adapter use [Stylis](https://stylis.js.org/)
> as the default CSS processor.

</el-blockquote>

<el-code-block>
<div el="bar-top-left"><b>Javascript</b></div>

```js
import { AdapterMixin } from 'https://cdn.jsdelivr.net/npm/@devcapsule/adapter/+esm';

class Component extends AdapterMixin(HTMLElement) {}
```
</el-code-block>

### APIs

<el-api>

#### `override static cssProcess(css): string` [middleware]
This static function act like a middleware to process all CSS
defined by Adapter APIs such as setting in `css` [property]
or using `addStyle(css)`. The codes below is the default implementation
in `Adapter class`.

<el-code-block>
<div el="bar-top-left"><b>Javascript</b></div>

```js
class Adapter extends AdapterMixin(HTMLElement) {
  static cssProcess(css) { return stylis(css) }
}
```
</el-code-block>

---

#### `static css: string` [property]

- Set CSS for the component.
- Clear all styles which have been defined from `addStyle()`.
- Last style wins.

<el-code-block>
<div el="bar-top-left"><b>Javascript</b></div>

```js
/** Usage 1 : In class definition */
class Component extends AdapterMixin(HTMLElement) {
  // ES2022 : class static initilization blocks
  static { this.css = `background-color: blue;` };
}

/** ES Ver < 2022 : Set class property after the class definition */
Component.css = `background-color: red;`;
```
</el-code-block>

#### `static addStyle(css: string)` [method]
Add style to the component. **CSS** string will be processed by `static cssProcess()`.

#### `static define(tagName: string)` [method]
Regist `tagName` and component's styles to **DOM**. Defined styles will be renderd
and take effect after calling this function.

</el-api>

## Isolator Mixin
---
This mixin provide Shadow DOM Isolation APIs and attribute observation for the component.
Read more in [Component Isolation](../isolation/#).

<el-code-block>
<div el="bar-top-left">Javascript</div>

```js
import { IsolatorMixin } from 'https://cdn.jsdelivr.net/npm/@devcapsule/adapter/+esm';

class Component extends IsolatorMixin(HTMLElement) {};
Component.define('el-component')

const component = new Component();
component.isolate('open');
document.body.append(component);
```

You can also isolate the component by setting `isolation` attribute
in html element.

<el-code-block>
<div el="bar-top-left">HTML</div>

```html
<el-component isolation="closed"></el-component>
```


### APIs

<el-api>

#### `isolate(mode: ShadowRootMode = 'open'): HTMLElement`

</el-api>

### Component Observation

<el-api>

#### [attribute] `isolation`
`IsolatorMixin` will observe and create Shadow DOM isolation based on
`isolation` attribute.

</el-api>