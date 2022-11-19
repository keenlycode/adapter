## Installation
---
<code class="tag">shell</code>
```shell
$ npm install @nitipit/adapter
```

## Usage
---
### Option 1 : Javascript bundle (@nitipit/adapter + @emotion/css)

Just copy `node_modules/@nitipit/adapter/dist/js/adapter.js` into your
website asset which can be accessed by browser.

<code class="tag">html</code>
```html
<script type="module">
import { define, Adapter } from './asset/adapter.js';
class Paragraph extends Adapter {};
define('el-paragraph', Paragraph);
Paragraph.tagStyle(`
    background-color: white;
`)
Paragraph.classStyle('grey', `
    background-color: grey;
`)
</script>

<body>
    <el-paragraph><!-- Background is white" --></el-paragraph>
    <el-paragraph class="grey"><!-- Background is grey" --></el-paragraph>
</body>
```

### Option 2 : Javascript module with build tools.
Now support only [parcel](https://parceljs.org/)

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

