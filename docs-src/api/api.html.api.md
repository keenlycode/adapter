# API

## Import
---
### Option 1: Module

<code class="tag">js</code>
```js
import { addStyle, define, StyleClass, Adapter } from 'adapter';
```

### Option 2: Bundle Javascript

<code class="tag">html</code>
```html
<script src="adapter.bundle.js?as=adapter"></script>
```
To avoid library namespace conflict. `?as=adapter` query parameter can be changed
to define custom imported name. For example, to import **Adapter** as `adpt`

<code class="tag">html</code>
```html
<script src="adapter.bundle.js?as=adpt"></script>
```

## Global CSS
---

<code class="tag">adapter.addStyle(style: string)</code>
> Add global scoped **CSS** by tag `<style>`

Example:
<code class="tag">js</code>
```js

```


### Define

<code class="tag">js</code>
```js
const define = (tagName: string, Class: any = Adapter) => {
    // Order of this function belows are very crucial.
    // Class state must be defined before `customElements.define`
    Class.tagName = tagName; // Set tagName.
    Class.define(tagName); // define this class to html tag.
    Class.initStyle(); // Init CSS for this tag.
}
```

## Adapter Class & Methods

<code class="tag">js</code>
```js
class Adapter extends HTMLElement {
   static tagStyle(style: any): void;
   static classStyle(className: string, style: string|object): void;
   addStyle(style: string|object): void;
}
```