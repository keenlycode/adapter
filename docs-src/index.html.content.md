## 🎉 Javascript UX/UI is fun, like never before.

For many years, Web Component Frameworks just focus on how to make
**Web Component APIs** look better. Adapter take to another approach
to focus on features which doesn't exist, to bring **CSS** into **OOP**
with **Web Component**

## 🎉 Easy to start & learn
You can start using **Adapter** without **Node.js** or any
**JS Build Tools**. Just use plain Javascript, right away in your browser.
You can even try it now by open browser console **`Ctrl+Shift+I`**.

<el-code-block>
    <div el="bar-top-left">
        <b>Javascript</b>
    </div>

```js
Particle.tagStyle(`
    border-radius: 0;
    transform: rotate(45deg);
`)
```
</el-code-block>

## Setup

### CDN (Content Delivery Network)

This way is super easy !! **Adapter** was born with **ES Modules** and
nothing else. Just import module right away in your browser.
and it's size just about **~2kB** !!

<el-code-block>
    <div el="bar-top-left">
        <b>html</b>
    </div>

```html
<head>
<script defer type="module">
import { Adapter }
    from "https://cdn.jsdelivr.net/npm/@devcapsule/adapter@2.0.0/+esm";

class AdaptiveDiv extends Adapter {};
AdaptiveDiv.define('el-adaptive-div');
AdaptiveDiv.tagStyle(`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 50vh;
    color: white;
    background-color: blue;
    font-weight: bold;
    font-size: 2rem;
`);
</script>
</head>
<body>
    <el-adaptive-div>
        Hello...<br>Adaptive Style Web Component
    </el-adaptive-div>
</body>

```

</el-code-block>

<el-code-block>
    <div el="bar-top-left">
        <b>shell</b>
    </div>

```shell
$ npm install @devcapsule/adapter
```

</el-code-block>