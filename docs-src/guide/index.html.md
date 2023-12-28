<h1 style="margin-top: 1.5rem;">Guide</h1>

## What is Adapter ?
---

**Adapter** is a JavaScript framework designed to seamlessly integrate CSS-in-JS
with Web Components, setting it apart from other CSS libraries.
It's important to note that Adapter is not a Web Component framework;
its primary focus is on Web Component styling and nothing more.

Despite its simplicity, **Adapter** unlocks endless possibilities
for enhancing UX/UI in web applications. This is a unique capability,
as traditional CSS frameworks have faced limitations
in achieving features such as encapsulation, inheritance, composition, event-interaction,
and other complex styling requirements.

**Adapter**, by combining CSS-in-JS with Web Components,
addresses these challenges and opens up new avenues for creating dynamic
and feature-rich user interfaces.


### Inheritance

```js
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

```

### Variables and Functions

```js
import Color from 'color';

function bgColor(color) {
    return css`
        background-color: ${color};
        color: ${Color(color).isDark() ? 'white' : 'black'};
    `.trim();
}

class RedFlexBox extends FlexBox {
    static css = css`${bgColor('red')}`
}

```