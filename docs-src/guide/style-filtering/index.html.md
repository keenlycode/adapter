# Style Filtering

## Filter out & Bypass
---

<button>Button</button> <a href="#">Link</a>

<el-filter-button>

This component filter out (revert) `<button>` style

<div class="width-100">
    <button>Button</button>
    <a href="#">Link</a>
</div>
</el-filter-button>

<el-code-block>
<div el="bar-top-left">JS</div>

```ts
import { Adapter } from '@devcapsule/adapter';

class FilterButton extends Adapter {
    static css = `& button { all: revert }`;
}

FilterButton.define('el-filter-button');
```
</el-code-block>

<el-code-block>
<div el="bar-top-left">HTML</div>

```html
<button>Button</button> <a href="#">Link</a>

<el-filter-button>
    This component filter out (revert) `<button>` style

    <div class="width-100">
        <button>Button</button>
        <a href="#">Link</a>
    </div>
</el-filter-button>
```
</el-code-block>

## Filter out all styles
---

<el-code-block>
<div el="bar-top-left">JS</div>

```js
class IsolatedComponent extends Adapter {
    static css = `all: revert; * { all: revert };`;
}
```
</el-code-block>