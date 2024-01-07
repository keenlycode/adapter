# CSS Processing

You can use custom CSS Processor by using `AdapterMixin.cssProcess()`
in class declaration.

<el-blockquote>

> It's recommended using class `AdapterMixin`
> since it doesn't have default CSS processor.
</el-blockquote>

for example, to use **stylis** as the CSS Processor
which is the default CSS Processor in `Adapter`

<el-code-block>
<div el="bar-top-left"><strong>JS</strong></div>

```ts
import { AdapterMixin } from '@devcapsule/adapter';
import {compile, serialize, stringify} from 'stylis';

class Component extends AdapterMixin(HTMLElement) {
    static cssProcess(css) { return serialize(compile(css), stringify) };
}
```
</el-code-block>