# Usage

<div id="component-style"></div>

## Component Style ( Class Style )
---

Class / Component Tier Styling will affect all elements
created from class with a defined **tagName**.
The result **CSS** will be rendered like..

<el-code-block>
    <div el="bar-top-left"><strong>css</strong></div>

```css
el-tagname {
    /* styles */
}
```
</el-code-block>

There are 3 APIs to do this as following description.

<el-blockquote>

> ℹ️ The reason to have many ways to style is to make it flexible
> to manage your components and styles in separated files or modules.
</el-blockquote>

### 1. Class Declaration Styling

The component can be styled while declaring the component class
by setting in `static css` property. This is the most common way
to style your components.

<el-code-block>
    <div el="bar-top-left"><strong>JS</strong></div>

```js
import { Adapter } from 'https://cdn.jsdelivr.net/npm/@devcapsule/adapter/+esm';

class Card extends Adapter {
    static css = `
        display: inline-flex;
        box-sizing: border-box;
        border: 1px solid;
        border-radius: 5px;
        padding: 1rem;
    `;
};

Card.define('el-card');
```
</el-code-block>

<el-code-block>
    <div el="bar-top-left"><strong>HTML</strong></div>

```html
<el-card>This is a card</el-card>
```
</el-code-block>

#### Result :

<el-card>This is a card</el-card>

### 2. Setting `static css` property

Component can be styled later by setting `static css`.
This will replace all styles for this component (not affect inherit styles).

This example also show how component can be extended and inherit
parent class style.

<el-code-block>
    <div el="bar-top-left"><strong>JS</strong></div>

```js
/** BlueCard inherit CSS from Card */
class BlueCard extends Card {};

BlueCard.css = `
    background-color: blue;
    color: white;
`;

/** It also works with native customElement.define() */
customElements.define('el-bluecard', BlueCard);
```

<el-code-block>
    <div el="bar-top-left"><strong>HTML</strong></div>

```html
<el-bluecard>This is a blue card</el-bluecard>
```
</el-code-block>

#### Result :
<el-bluecard>This is a blue card</el-bluecard>

### 3. Using function `static addStyle(css: string)`
Using `addStyle()` will add more CSS style to the component
(Not replacing it).

<el-code-block>
    <div el="bar-top-left"><strong>JS</strong></div>

```js
BlueCard.addStyle(`
    &.largeFont {
        font-size: 2em;
    }
`);
```

<el-code-block>
    <div el="bar-top-left"><strong>HTML</strong></div>

```html
<el-bluecard class="largeFont">This is a blue card with large font</el-bluecard>
```
</el-code-block>

#### Result :
<el-bluecard class="largeFont">This is a blue card with large font</el-bluecard>

<div id="element-style"></div>

## Element Style ( Object Style )
---
**Object Tier Styling** will render **CSS**
with the auto-generated unique class selector, much like the following code.
```css
el-card.predefine.class.and.autogen { /* style */ }
```
This way, the style will be very specific to an element,
but with a bit lower priority than inline style.
There are 2 APIs to style component object (element)
with the same manner as **Class / Component Styling**

### 1. Setting `css` property
This will replace component object styles, but not affect
**Class / Component Styles**

<el-code-block>
    <div el="bar-top-left"><strong>JS</strong></div>

```js
document.querySelector('el-bluecard#blue-card-lift').css = `
    filter: drop-shadow(10px 10px 10px #444);
`;
```
</el-code-block>

<el-code-block>
    <div el="bar-top-left"><strong>HTML</strong></div>

```html
<el-bluecard id="blue-card-lift">Lift me up</el-bluecard>
```
</el-code-block>

#### Result :
<el-bluecard id="blue-card-lift">Lift me up</el-bluecard>

### 2. Using `addStyle(css: string)`
This will add more style to component object (element).

<el-code-block>
    <div el="bar-top-left"><strong>JS</strong></div>

```js
document.querySelector('#blue-card-rotate').addStyle(`
    transform: rotate(45deg);
`);
```
</el-code-block>

<el-code-block>
    <div el="bar-top-left"><strong>HTML</strong></div>

```html
<el-bluecard id="blue-card-rotate">Rotate me</el-bluecard>
```
</el-code-block>

#### Result :

<el-bluecard id="blue-card-rotate">Rotate me</el-bluecard>

<div id="shadow-dom"></div>

## Shadow DOM just works !!
---
Most of the time, styling the DOM with **Adapter** will cover everything
you need to program CSS in an object-oriented manner.
However, if you are seeking complete control and isolation
for your components, Shadow DOM is the way to go.

Thanks to `adoptedStyleSheets`, **Adapter** can use it as the proper way
to automatically style element when attached inside a Shadow DOM.

<el-code-block>
    <div el="bar-top-left"><strong>JS</strong></div>

```js
class ShadowHost extends Adapter {
    constructor() {
        super();
        const innerHTML = this.innerHTML;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = innerHTML;
    }
}

customElements.define('el-shadow-host', ShadowHost);
```
</el-code-block>

<el-code-block>
    <div el="bar-top-left"><strong>HTML</strong></div>

```html
<el-shadow-host>
    <el-bluecard>This card is in Shadow DOM</el-bluecard>
</el-shadow-host>
```
</el-code-block>

#### Result :
<el-shadow-host>
    <el-bluecard>This card is in Shadow DOM</el-bluecard>
</el-shadow-host>