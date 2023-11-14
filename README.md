<h1 style="text-align: center">✨ Adapter 🎉</h1>

> <h2 style="margin-top: 0; padding: 1rem;">
> Adaptive + Stylable Web Component Framework
> </h2>

<ul style="font-size: 1.25rem;">
   <li>Built with ❤️</li>
   <li>Just <strong>850 B</strong> (minified + gzip)</li>
   <li>Just <strong>10 kB</strong> (minified + gzip)
       combined with your favourite html rendering libraries:
       <a href="https://lit.dev/docs/libraries/standalone-templates/">lit-html</a> or
       <a href="https://github.com/WebReflection/uhtml">uhtml</a>
   </li>
</ul>

## Sample Usage for Frontend (with uhtml)
```js
import { Adapter } from `@devcapsule/adapter`;
import { render, html } from 'uhtml';

class Card extends Adapter {
   constructor() {
      super();
      this.renderHTML();
   }
   renderHTML(name="Card") {
      render(this, html`
         <h1>My name is ${name}</h1>
      `)
   }
};

// Don't worry about tag's name conflicted, choose your own.
Card.define('el-card');

/* Style is isolated with defined tag name.
 * It won't go anywhere outside the component.
 * All <el-card> style will be updated.
 */
Card.tagStyle(`color: red;`);

// Style class can also be used.
// This will style <el-card class="text-blue">
Card.classStyle('text-blue', `color: blue;`);

// Dynamically create stylable element.
const card = document.createElement('el-card');
card.addStyle(`color: black`);
card.renderHTML('black');
```

## Project Board
https://github.com/orgs/keenlycode/projects/2

## Software Development 💻

### Prerequisites
- NodeJS : https://nodejs.org/en/
- Git : https://git-scm.com/
- Python >= 3.10 : https://www.python.org/

### 🛠️ Setup
1. Clone repository from github
```shell
$ git clone https://github.com/keenlycode/adapter.git
$ cd adapter
```

2. Install node dependencies
```shell
$ npm install
```

3. Setup **Python** environment & libs
```shell
$ python -m venv venv
$ source venv/bin/activate
$ pip install -r require.pip
```

### 🗃️ Build Library
```shell
$ npm run build
$ npm run types
```
or run with python `cli.py`
```shell
$ python cli.py build
```

### 📕 Build Docs
```shell
$ npm run docs
```

### 🔍 Run Test
```shell
$ npm run test
```

### 🐍 Run development process with Python
Command below will run `npm run docs` and `jest` in watch mode.
```shell
$ python cli.py dev
```