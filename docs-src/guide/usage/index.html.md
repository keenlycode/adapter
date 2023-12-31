# Usage

## Extends Adapter component
No building tools needed ! 😉 If you don't know what it is, just ignore it
and do as the following instructions.
1. Create `index.html`
2. Copy and paste the code below, then **save**
3. Open `index.html` with your browser.
Boom !!

<el-code-block>
<div el="bar-top-left"><strong>HTML</strong></div>

```html
<html>
<head>
<script defer type="module">
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

/** Set css after class declaration */
Card.css = `
    ${Card.css}
    &.text-blue {
        color: blue;
    }
`;

Card.define('el-card');

</script>
</head>

<body>
    <el-card>This is a card</el-card>
    <el-card class="text-blue">This card has blue text</el-card>
</body>
</html>
```
</el-code-block>