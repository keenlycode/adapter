# Style Filtering

Style Filtering is a useful technique for filtering or bypassing styles
from other components are used inside the container component.
As a result, we can effortlessly mix and match or isolate styles between components.

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
    static css = `
        & button { all: revert }
        & button:hover { all: revert };
    `;
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