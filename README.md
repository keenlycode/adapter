<h1 style="text-align: center">✨ Adapter 🎉</h1>

> <h2 style="margin-top: 0; padding: 1rem;">
> Empowering Next-Generation UI Style with ES6 and Web Components
> </h2>

<ul style="font-size: 1.25rem;">
   <li>Built with ❤️</li>
   <li>Just <strong>3 kB</strong> (minified + gzip)</li>
   <li>Runs natively on <strong>Deno</strong> and also builds for browser/Node</li>
</ul>

## Sample Usage

#### For modern browsers (ESM/CDN)
```js
import { Adapter } from "https://cdn.jsdelivr.net/npm/@devcapsule/adapter/+esm";
```

#### For Deno (TypeScript)
```ts
import { Adapter } from "jsr:@devcapsule/adapter";
```

#### Universal (Bundled for browser/Node via dist/)
```js
import { Adapter } from "@devcapsule/adapter";
```

Example:
```js
import { Adapter } from "https://cdn.jsdelivr.net/npm/@devcapsule/adapter/+esm";

const cardStyle = `
   display: block;
   min-height: 5rem;
   width: 100%;
   color: red;
`;

class Card extends Adapter {
   /** Style is isolated in defined tag name. */
   static css = cardStyle;
}

/** Don't worry about tag's name conflicted, choose your own. */
Card.define('el-card');

/**
 * More style can be added later, class can also be used.
 * This will render CSS as `el-card.text-blue { color: blue }`
 */
Card.addStyle(`
   &.text-blue { color: blue }
`);

/** Replace component styles with the base style `cardStyle`,
 * This is just one from many way to do it.
 */
Card.css = cardStyle;

/** Dynamically create stylable element <el-card>
 * which inherit all styles from `Card`
 */
const card = new Card();

/** <el-card> object has the same API as `Card`
 * but style will be specific for this element only.
 */
card.css = `display: flex;`;
card.addStyle(`color: black;`);
document.body.append(card);
```

const cardStyle = `
   display: block;
   min-height: 5rem;
   width: 100%;
   color: red;
`;

class Card extends Adapter {
   /** Style is isolated in defined tag name. */
   static css = cardStyle;
};

/** Don't worry about tag's name conflicted, choose your own. */
Card.define('el-card');

/**
 * More style can be added later, class can also be used.
 * This will render CSS as `el-card.text-blue { color: blue }`
 */
Card.addStyle(`
   &.text-blue { color: blue }
`);

/** Replace component styles with the base style `cardStyle`,
 * This is just one from many way to do it.
 */
Card.css = cardStyle;

/** Dynamically create stylable element <el-card>
 * which inherit all styles from `Card`
 */
const card = new Card();

/** <el-card> object has the same API as `Card`
 * but style will be specific for this element only.
 */
card.css = `display: flex;`;
card.addStyle(`color: black;`);
document.body.append(card);
```

## Software Development 💻

### Project Board
https://github.com/orgs/keenlycode/projects/2

### Prerequisites

- [Deno](https://deno.com/) (`v1.39.0` or above is recommended)
- [Git](https://git-scm.com/)
- *(optional, for docs)* Python >= 3.10 : https://www.python.org/

### 🛠️ Setup and Development

1. Clone repository from github
```shell
git clone https://github.com/keenlycode/adapter.git
cd adapter
```

2. (Optional) Install Node dependencies (only if you want to use npm for legacy or browser builds):
```shell
npm install
```

---

### 🗃️ Build Library / Bundle

**For browser/Node (using Deno+esbuild)**
```shell
deno task dist
```
Artifacts will be emitted to `dist/browser/`.

**For TypeScript (Deno, JSR)**
Type definitions and modules are maintained in `src/`.

---

### 🔍 Run Tests

**Browser-based tests:**
```shell
deno task test
```
- or run specific tasks from `deno.json` like:
    - `deno task test:esbuild`
    - `deno task test:html`

**(Legacy: using npm for compatibility)**
```shell
npm run test
```

---

### 📚 Document Creation (Python 🐍)

*Python is only needed for documentation pipeline.*

```shell
python -m venv venv
source venv/bin/activate
pip install -r require.pip
deno task docs      # Or: npm run docs
```

---

## Special Thanks
2024-01-09
- [Joe Pea](https://github.com/trusktr): for a lot of suggestions
  at the very beginning about Mixin, Style Rendering and Shadow DOM.
  Knowing him by chance when I found interesting project : [Lume.io](https://lume.io) 👍️

<div style="min-height: 20vh;"></div>
