## 🎉 CSS to the next level.

Adapter make **CSS** programmable in **OOP** manner
with **Javascript** and **Web Components**. It's packed with
well designed features to help developers create styling system
for web components such as **style inheritance**, **scoped style** and
**style isolation**.

<el-code-block>
<div el="bar-top-left"><b>Javasacript</b></div>

```js
import { Adapter } from 'https://cdn.jsdelivr.net/npm/@devcapsule/adapter/+esm';

class Card extends Adapter {};

Card.css = `
  display: flex;
  flex-wrap: wrap;
  background-color: blue;
  border: 1px solid;
  border-radius: 5px;
  & h1 {
    margin: 0;
  }
`;

Card.define('el-card');
```
</el-code-block>

<el-code-block>
<div el="bar-top-left"><b>HTML</b></div>

```html
<el-card>
  <h1>This is a card</h1>
</el-card>
```

## 🎉 Easy to start & learn
You can start using **Adapter** without **Node.js** or any
**JS Build Tools**. Just use plain Javascript, right away in your browser.

<el-code-block>
<div el="bar-top-left"><b>HTML</b></div>

```html
<!-- import from CDN -->
<script type="module">
import { Adapter } from 'https://cdn.jsdelivr.net/npm/@devcapsule/adapter/+esm';

class Container extends Adapter {};

Container.css = `
  margin: auto;
  max-width: 1000px;
  min-width: 300px;
  width: 90%;
`;
</script>
```
</el-code-block>

## 🎉 Compact

<div style="text-align: center;">
<strong style="font-size: 1.5em;">~ 2kB</strong> minify gzip
</div>