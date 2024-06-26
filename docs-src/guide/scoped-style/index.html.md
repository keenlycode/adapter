# Scoped Style

**Scoped Style** could be the easiest way to apply styles to 
elements. Start with a bit of code and you can get magical elements with
scoped style. Just set element style with `css` attributes.

<el-blockquote>

> 💁 `css` syntax here also support nesting by [stylis](stylis.js.org)
> as the default css processor. You can read more how to set
> css processor in [Mixin](../mixin/#) Section. Setting `css` here
> is the same as setting `css` property in the object
> [read more](../usage/#element-style).

</el-blockquote>

<el-code-block>
    <div el="bar-top-left">JS</div>

```ts
import { Adapter }
  from "https://cdn.jsdelivr.net/npm/@devcapsule/adapter/+esm";

class Style extends Adapter {};
Style.define('el-div');
```
</el-code-block>

<el-code-block>
  <div el="bar-top-left">HTML</div>

```html
<el-div css="
display: inline-flex;
box-sizing: border-box;
border: 1px solid;
border-radius: 5px;
padding: 1rem;
button {
    background-color: red
};
">
  <button>Button 1</button>
</el-div>

<el-div css="button { background-color: blue };">
    <button>Button 2</button>
</el-div>
```
</el-code-block>

<el-div css="
display: inline-flex;
box-sizing: border-box;
border: 1px solid;
border-radius: 5px;
padding: 1rem;
button { background-color: red };
">
  <button>Button 1</button>
</el-div>

<el-div css="button { background-color: blue };">
  <button>Button 2</button>
</el-div>