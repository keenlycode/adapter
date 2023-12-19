<h1 style="text-align: center">✨ Adapter 🎉</h1>

> <h2 style="margin-top: 0; padding: 1rem;">
> Adaptive Style Web Component Framework
> </h2>

<ul style="font-size: 1.25rem;">
   <li>Built with ❤️</li>
   <li>Just <strong>1 kB</strong> (minified + gzip)</li>
</ul>

## Sample Usage
```js
import { Adapter } from `@devcapsule/adapter`;

class Card extends Adapter {};

// Don't worry about tag's name conflicted, choose your own.
Card.define('el-card');

/* Style is isolated with defined tag name.
 * It won't go anywhere outside the component.
 * All <el-card> style will be updated.
 */
Card.addStyle(`
   display: block;
   min-height: 5rem;
   width: 100%;
   color: red;`
);

// Style class can also be used.
// This will style <el-card class="text-blue">
Card.addStyle(`
   &.text-blue {
      color: blue;
   }
`);

// Dynamically create stylable element.
const card = new Card();
card.addStyle(`color: black`);
document.body.append(card);
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
# Build
$ npm run dist
```

### 📕 Build & Run Docs Server
```shell
$ npm run docs
```

### 🔍 Run Test
```shell
$ npm run test
```