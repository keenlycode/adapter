# Introduction

## What is Adapter ?
---

<div class="aspect-ratio-21-9">
    <img src="./adapter.jpg">
</div>

**Adapter** is a JavaScript framework designed to seamlessly integrate
**CSS-in-JS** with **Web Components**. Setting it apart from other
**CSS** libraries, Adapter is framework which focus is on
**Web Component Styling**.

Despite its simplicity, **Adapter** unlocks endless possibilities
for enhancing UX/UI in web applications. While traditional **CSS** frameworks
have faced limitations, on the other hand, **Adapter** can implement features
such as encapsulation, inheritance, composition, event-interaction,
and other complex styling requirements which opens up new potential
for creating dynamic and feature-rich user interfaces.

## Examples
---

### OOP

```ts
import { Adapter, css } from '@devcapsule/adapter';

class FlexBox extends Adapter {
    static css = css`
        display: flex;
        justify-content: center;
    `;
}

/** WrapFlexBox also inhertit styles from FlexBox */
class WrapFlexBox extends Flexbox {
    static css = css`
        flex-wrap: wrap;
    `;
}

WrapFlexBox.define('el-wrap-flexbox');
```

This will produce CSS as

```css
el-wrap-flexbox {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

```

Then, you can use them in html or create an instance by javascript

<el-code-block>
<div el="bar-top-left">Javascript</div>

```js
// Create <el-flexbox> in OOP manner.
const flexBox = new FlexBox();
document.body.append(flexBox);
```
</el-code-block>

<el-code-block>
<div el="bar-top-left">HTML</div>

```html
<el-wrap-flexbox></el-wrap-flexbox>
```
</el-code-block>

<div style="margin-top: 2rem;"></div>

### Variables and Functions

<el-code-block>
<div el="bar-top-left">Javascript</div>

```ts
import Color from 'color';

function bgColor(color) {
    return css`
        background-color: ${color};
        color: ${Color(color).isDark() ? 'white' : 'black'};
    `.trim();
}

class RedFlexBox extends FlexBox {
    static css = css`${bgColor('red')}`;
}

export { bgColor, RedFlexBox };
```
</el-code-block>

<div style="margin-top: 2rem;"></div>

### Variables / Functions / OOP / Modules , That's it !

### CSS now is programmable with ES6 ! ... What else do we need ? 😉

## What problem is the adapter trying to solve ?
---

One of the most common problems for **CSS** which is hard to implement
is **Style Encapsulation and Inheritance**, since we can't easily make sure that element styles
won't **unintentionally** be inherited or overridden from somewhere else.

Consider this situation where button style has been defined
in one of `<style>` tag

```html
<style>
    div > button { background-color: red }
</style>
```

If we have a component somewhere which contains `<button>` without using
`customElements`

```html
<div class="componentA">
    <div><button>Button</button></div>
</div>
```

In this situation, your components style **might** be overridden by
global `<style>` from somewhere if you don't make **CSS** selector
more specific like,

```html
<style>
/* this won't work */
.componentA {
    div button { background-color: blue }
}

/* this work */
.componentA {
    div > button { background-color: blue }
}
</style>
```
This is just a simple example. Imagine when we have many elements
and more style properties; this could be a headache
and prone to causing errors in component styling,
or at least it prevents us from achieving a composed style
between elements/components or libraries.

### Component Styling to save the world !

**Web Component Styling** can solve this problems, because
1. When you use `customElements.define()`, it will show errors
   if the custom element has already been defined somewhere else,
   allowing you to decide how to deal with it.
2. Defined custom elements have their own unique tags,
   preventing global styles from **unintentionally** overriding components
   and their elements. However, you still have full control of a component
   from global styles if desired, making it ideal for theming
   which **Shadow DOM lacks this features**.