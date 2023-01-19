# API

## Import
---
### Option 1: Module

<code class="tag">js</code>
```js
import { addStyle, define, StyleClass, Adapter } from '@nitipit/adapter';
```

### Option 2: Bundle Javascript

<code class="tag">js</code>
```js
import { addStyle, define, StyleClass, Adapter } from '@nitipit/adapter/dist/module/adapter.bundle.js';
```

## Global CSS
---
<code class="tag">adapter.addStyle(style: string)</code>
<blockquote>
    Add global scoped <strong>CSS</strong> by tag <code>&lt;style&gt;</code>
</blockquote>

Example:  
<code class="tag">js</code>
```js
addStyle(`
    body {
        background-color: blue;
    }
`)
```

## Adapter Class & Methods
---

<code class="tag">js</code>
```js
class Adapter extends HTMLElement {
   static tagStyle(style: any): void;
   static classStyle(className: string, style: string|object): void;
   addStyle(style: string|object): void;
}
```