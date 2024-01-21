# Style Isolation

**Adapter** provides an API to entirely isolate itself inside **Shadow DOM**.
In contrast to other Web Component Frameworks, an **Adapter** component
is fully contained within **the Shadow DOM** to simplifies CSS
as there's no need to use `:host` selector and the DOM structure will be
the same whether using Shadow DOM or not.

<img src="isolation.png" style="display: block; margin: auto;">

<el-code-block>
    <div el="bar-top-left">JS</div>

```js
class ElementA extends Adapter {};
ElementA.define('el-a');
```
</el-code-block>

<el-code-block>
    <div el="bar-top-left">HTML</div>

```html
<button>Button</button>
<el-a isolation="open">
    <button>Isolated Button</button>
</el-a>
```
</el-code-block>

<button>Button</button>

<el-a isolation="open">
    <button>Isolated Button</button>
</el-a>

And this is the rendered DOM for `<el-a>`

<img src="result-1.png" style="width: auto;">