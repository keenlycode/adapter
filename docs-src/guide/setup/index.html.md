# Setup

<h2 id="#cdn">CDN</h2>

---
Using content delivery network is the easiest way to use **Adapter**
<el-code-block>
<div el="bar-top-left">html</div>

```html
<script type="module">
    import { Adapter } from 'https://cdn.jsdelivr.net/npm/@devcapsule/adapter@2.3.1/+esm'
</script>
```
</el-code-block>


<h2 id="#npm">NPM</h2>

---
Install using NPM is recommended for production use.

<el-code-block>
<div el="bar-top-left">shell</div>

```shell
$ npm install @devcapsule/adapter
```
</el-code-block>

It's recommended to use Javascript Building Tools such as 
**ESBuild**, **Parcel**, **Rollup** etc. Please read thier documentation.
After setting up, you can import Adapter in javascript

<el-code-block>
<div el="bar-top-left">Javascript</div>

```js
import { Adapter } from '@devcapsule/adapter';
```