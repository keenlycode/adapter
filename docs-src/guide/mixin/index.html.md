# Mixin

Use `AdapterMixin()` to implement **Adapter** with other Web Components.

<el-blockquote>

> 📍 `AdapterMixin` doesn't include CSS processor like `Adapter`,
> It has to be manually set by `cssProcess()` function.

</el-blockquote>

<el-code-block>
<div el="bar-top-left">Javascript</div>

```ts
import { AdapterMixin, stylis } from "@devcapsule/adapter";

class SimpleGreeting extends AdapterMixin(HTMLElement) {
    /** Manually set CSS Processor */
    static cssProcess(css) { return stylis(css) };

    static css = `p { color: blue }`;

    name = "Somebody";

    constructor() {
        super();
        this.innerHTML = `<p>Hello, ${this.name}</p>`;
    }
}

SimpleGreeting.define('simple-greeting');
```

</el-code-block>
