# Mixins and APIs

In JavaScript, a mixin is a way to reuse a set of functionalities
across multiple objects or classes. It allows you to compose objects
or classes with behavior from multiple sources, enhancing modularity
and code reuse. Read more at [Typescript Mixin](https://www.typescriptlang.org/docs/handbook/mixins.html)

**Adapter** carefully designed component functionalities and put them into
separate classes which can be mixed and matched together based on use case.
This can reduced javascript code size in production by using
javascript build tools.

## `AdapterMixin(class_: typeof HTMLElement)`

This mixin provides APIs to style HTMLElement

<el-blockquote>

> 📍 `AdapterMixin` doesn't include CSS processor like `Adapter`,
> It has to be manually set by `cssProcess()` function.

</el-blockquote>

<el-code-block>
<div el="bar-top-left">Javascript</div>

```ts
import { AdapterMixin, stylis } from "@devcapsule/adapter";

class SimpleGreeting extends IsolatorMixin(AdapterMixin(HTMLElement)) {
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
