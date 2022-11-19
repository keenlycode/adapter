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
Now support [parcel](https://parceljs.org/).  
(Haven't tested on other build tools)

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

## API
---

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

### Adapter Class & Methods

<code class="tag">js</code>
```js
class Adapter extends HTMLElement {
   static tagStyle(style: string|object): void;
   static classStyle(className: string, style: string|object): void;
   addStyle(style: string|object): void;
}
```