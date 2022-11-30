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
Just copy `adapter.bundle.js` into your
website asset which can be accessed by browser.

<code class="tag">html: \<head\></code>
```html<head>
<!-- #1 -->
<script src="adapter.bundle.js?as=adapter"></script>

<!-- #2 -->
<script>
class Paragraph extends adapter.Adapter {};
define('el-paragraph', Paragraph);

Paragraph.tagStyle(`
    background-color: white;
`);

Paragraph.classStyle('grey', `
    background-color: grey;
`);
</script>
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
import { define, Adapter } from '@nitipit/adapter';
class Paragraph extends Adapter {};
define('el-paragraph', Paragraph);
```

Install parcel & build

<code class="tag">shell</code>
```shell
$ npm install --save-dev parcel
$ npx parcel build 'index.js' --dist-dir 'html'
```