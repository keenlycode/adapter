## 🎉 Javascript UX/UI is fun, like never before.

For many years, Web Component Frameworks just focus on how to make
**Web Component APIs** look better. Adapter take to another approach
to focus on features which doesn't exist, to bring **CSS** into **OOP**
with **Web Component**

## 🎉 Easy to start & learn
You can start using **Adapter** without **Node.js** or any
**JS Build Tools**. Just use plain Javascript, right away in your browser.
You can even try it now by open browser console **`Ctrl+Shift+I`** and try
styling particles above with the codes below.

<el-code-block>
    <div el="bar-top-left">
        <b>Javascript</b>
    </div>

```js
/* this code will style <el-particle> */
Particle.tagStyle(`
    border-radius: 0;
    transform: rotate(45deg);
`);

/* this code will style <el-particle class="blue"> */
Particle.classStyle('blue', `
    background-color: aqua;
    border-color: blueviolet;
`);
```
</el-code-block>

## 🎉 CSS ❤️ OOP ❤️ Web Component

Because **Adapter** extends from **HTMLElement**, it's a pure **Web Component**
which bring all good features to **CSS** : Module, Inheritance, Encapsulation,
Object and much more...

<el-code-block>
    <div el="bar-top-left">javascript</div>

```js
/* Particle1 also inherit style defined from Particle */
class Particle1 extends Particle {
    constructor() {
        super();
    }
    connectedCallback() {
        // Do something when Particle1 instance is attached to DOM
    }
};

```
</el-code-block>

## 🎉 Compact

<div style="text-align: center;">
<strong style="font-size: 1.5em;">~ 2kB</strong> minify<br>
<strong style="font-size: 1.5em;">~ 1kB</strong> minify gzip
</div>

## 🎉 Extensible

You can extends your components with great libraries:
- HTML: lit-html, uhtml
- CSS Parser: csstree, stylis
- Event: nanoevents

## 🎉 Setup

### CDN (Content Delivery Network)

This way is super easy !! **Adapter** was born for **ES Modules** and
nothing else. Just import module right away in your browser.
The bundle's size is just about **~2kB** !!

<el-code-block>
    <div el="bar-top-left">
        <b>html</b>
    </div>

```html
<head>
<script defer type="module">
import { Adapter }
    from "https://cdn.jsdelivr.net/npm/@devcapsule/adapter@2.0.0/+esm";
</script>
</head>
```
</el-code-block>

### Javascript Bundle Tools

If you're familiar with **NodeJS**, you can install **Adapter**
with `npm` and use it with javascript bundle tools.

<el-code-block>
    <div el="bar-top-left">
        <b>shell</b>
    </div>

```shell
$ npm install @devcapsule/adapter
```
</el-code-block>

<el-code-block>
    <div el="bar-top-left">
        <b>javascript</b>
    </div>

```js
import { Adapter } from '@devcapsule/adapter';
```
</el-code-block>

### The APIs

**Adapter** Provide 3 simple APIs to style components.

<el-code-block>
    <div el="bar-top-left">
        <b>APIs</b>
        <span style="margin-left: 0.5rem;">(described in typescript)</span>
    </div>

```ts
Adapter.tagStyle(css: string);
Adapter.classStyle(className, css: string);
<Adapter Object>.addStyle(css: string);
```

</el-code-block>

### Sample Usage

<el-code-block>
    <div el="bar-top-left">
        <b>javascript</b>
    </div>

```js
/* Extends `Adapter` */
class Adaptive extends Adapter {};

/* Define your component to custome element name `el-adaptive` */
Adaptive.define('el-adaptive');

/* Style element <el-adaptive> */
Adaptive.tagStyle(`
    display: flex;
    justify-content: center;
`);

/* Style element <el-adaptive class="blue"> */
Adaptive.classStyle('blue', `
    color: blue;
`)

```
</el-code-block>

<el-code-block>
    <div el="bar-top-left">
        <b>html</b>
    </div>

```html
<el-adaptive>
    Hello... Adaptive Style Web Component
</el-adaptive>

<el-adaptive class="blue">
    This text is blue.
</el-adaptive>
```
</el-code-block>