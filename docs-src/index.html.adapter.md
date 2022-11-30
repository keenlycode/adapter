**CSS** in complex WebApp nowadays is getting messy, because **CSS**
is just styling language. It lacks of features to scale up and maintain.
However, **Adapter** fix these problems by bringing **CSS**
into **OOP** world with **Javascript** and **\<web-component/\>**.
This is a very easy but powerful solution which leverages **CSS**
to the next level with following advantages:

1. Simple **API**, easy to understand and use.
2. Using **\<web-component/\>** which is standard and works well
   with other tools or frameworks.
3. **CSS** becomes Adaptive, Programmable and can be encapsulted inside
   **\<web-component/\>**

> **Adapter** is just `15KB` javascript minified.  
> You can see [Gadjet](https://nitipit.github.io/gadjet/index.html) project
> which based on **Adapter**.

Let's see how **Adapter** implement **CSS** into **\<web-component/\>**

<code class="tag">js</code>
```js
class Paragraph extends Adapter {};
define('el-paragraph', Paragraph);
Paragraph.tagStyle(`background-color: white;`);
Paragraph.classStyle('grey', `background-color: grey;`);

const paragraph2 = document.querySelector("parapraph-2");
paragraph2.addStyle(`color: white;`);
paragraph2.addStyle(`transform: rotate(90deg);`);
```

<code class="tag">html</code>
```html
<el-paragraph>First Paragraph</el-paragraph>
<el-paragraph id="paragraph-2" class="grey">Second Paragraph</el-paragraph>
```



<el-icon name="power" style="font-size: 5rem;"></el-icon>