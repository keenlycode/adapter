## 🎉 Style your components

**Adapter** provide simple APIs to style your components with OOP manner.

<el-code-block>
    <div el="bar-top-left">
        <b>APIs : Described in typescript</b>
    </div>

```ts
Adapter.tagStyle(css: string);
Adapter.classStyle(className, css: string);
<Adapter Object>.addStyle(css: string);
```

</el-code-block>

### Extends Adapter

To use APIs in your components, just declare component class which extends
**Adapter** and then define it to custom element.

<el-code-block>
    <div el="bar-top-left">
        <b>javascript</b>
    </div>

```js
/* Extends Adapter */
class Particle extends Adapter {};

/* Define Particle to custom element */
Particle.define('el-particle');
```

</el-code-block>

### APIs

#### `Adapter.tagStyle(css: string)`

For example, from the particles above which has been loaded into this webpage,
you can open browser console **`Ctrl+Shift+I`** and execute codes below to
change particles style dynamically.

<el-code-block>
    <div el="bar-top-left">
        <b>javacript</b>
    </div>

```js
Particle.tagStyle(`
    background-color: aqua;
    border-color: blueviolet;
`)
```

</el-code-block>

<el-particle-scene style="margin-top: 2rem;"></el-particle-scene>