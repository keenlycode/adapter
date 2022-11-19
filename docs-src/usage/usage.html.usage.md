## Installation
```shell
$ npm install @nitipit/gadjet
```

## Usage
### Option 1 : Javascript bundle (@nitipit/adapter + @emotion/css)

Just copy `node_modules/@nitipit/adapter/dist/js/adapter.js` into your
website asset which can be accessed by browser.

```html
<script type="module">
import { define, Adapter } from './asset/adapter.js';
class Paragraph extends Adapter {};
define('el-paragraph', Paragraph);
</script>

<body>
    <el-paragraph></el-paragraph>
</body>
```

### Option 2 : Javascript module with build tools.

`js`
```js
import { define, Adapter } from './asset/adapter.js';
class Paragraph extends Adapter {};
define('el-paragraph', Paragraph);
```