<div style="margin-top: 2rem; width: 100%;"></div>

**Adapter** use simple and small **Javascript** codes which bring **CSS**
into **Web Component**.

**Adapter** is just `15KB` bundle with `@emotion/css`


```js
import { define, Adapter } from 'adapter/src/adapter.ts'

class Paragraph extends Adapter {};
define('el-paragraph', Paragraph);
Paragraph.tagStyle(`
    .container {
        display: block;
    }
    p {
        width: 100%;
        font-size: 1rem;
    }
`);
Paragraph.classStyle('flex', `
    .container {
        display: flex;
    }
`);
```

The codes above will render **CSS** as :

```css
el-paragraph .container {
    display: block;
}
el-paragraph p {
    width: 100%;
    font-size: 1rem;
}
el-paragraph.flex .container {
    display: flex;
}
```

Usage in **HTML** :

```html
<el-paragraph>
    <div class="container">
        <p>Block paragraph</p>
    </div>
</el-paragraph>
<el-paragraph class="flex">
    <div class="container">
        <p>Flexbox paragraph</p>
    </div>
</el-paragraph>
```

## "CSS" management is easy if we do it in the right way.

**CSS** in complex WebApp nowadays is getting messy. Because **CSS**
is just styling language. It lacks of features to scale up and maintain.
However, **Adapter** fix those problems by bringing **CSS**
into **OOP** world with **Javascript** and **Web Component**.
This is very easy but powerful solutions compare to other
**CSS** methodoligies or frameworks.

**Adapter** is not a complete set of **CSS** for web design. It just integrates
**CSS** into **Web Component** and **Javascript** with:

1. Simple **API**, easy to understand.
2. Based on standard. Works well with other tools or frameworks.
3. **CSS** is under your control and encasulated in components.

You can see [Gadjet](https://nitipit.github.io/gadjet/index.html) project
which based on **Adapter**. I Hope this can be the initiation for many
HTML UI projects to come in the future. ;)