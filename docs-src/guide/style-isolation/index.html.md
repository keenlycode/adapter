# Style Isolation

**Adapter** provides an API to entirely isolate itself inside **Shadow DOM**.
In contrast to other Web Component Frameworks, an **Adapter** component
is fully contained within **the Shadow DOM**. This implementation simplifies CSS
as there's no need to use `:host` selector whether using Shadow DOM or not
in component styles.

<el-code-block>
    <div el="bar-top-left">JS</div>

```js
class ElementA extends Adapter {};
```
</el-code-block>

<el-a isolation="open"></el-a>
<el-b isolation="closed"></el-b>