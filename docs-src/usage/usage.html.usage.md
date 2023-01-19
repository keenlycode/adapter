## Installation
---
<code class="tag">shell</code>
```shell
$ npm install @nitipit/adapter
```

## Usage
---
### Option 1 : Javascript bundle

This is the easiest way to use **Adapter**.
Just import `adapter.bundle.js` in javascript.

<code class="tag">js: \<script defer\></code>
```js
import { Adapter } from '@nitipit/adapter/dist/module/adapter.bundle.js';

class Paragraph extends Adapter {};
Paragraph.define('el-paragraph');

Paragraph.tagStyle(`
    background-color: white;
`);

Paragraph.classStyle('grey', `
    background-color: grey;
`);
```

<code class="tag">html: \<body\></code>
```html
<el-paragraph><!-- Background is white" --></el-paragraph>
<el-paragraph class="grey"><!-- Background is grey" --></el-paragraph>
```

### Option 2 : Javascript module with build tools.
[parcel](https://parceljs.org/) is recommend. Other tools aren't tested
but should work fine.
(**esbuild**, **vite** or **webpack**).

<code class="tag">js : index.js</code>
```js
import { Adapter } from '@nitipit/adapter';

class Paragraph extends Adapter {};
Paragraph.define('el-paragraph');
```

Install parcel & build

<code class="tag">shell</code>
```shell
$ npm install --save-dev parcel
$ npx parcel build 'index.js' --dist-dir 'html'
```