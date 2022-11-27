import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript.js';
import css from 'highlight.js/lib/languages/css.js';
import shell from 'highlight.js/lib/languages/shell.js';
import typescript from 'highlight.js/lib/languages/typescript.js';
import 'highlight.js/styles/base16/solarized-light.css';

import 'normalize.css';

import { html, render } from 'uhtml';

import { fontFluid } from 'gadjet/src/style/font-fluid';
import { bgColor } from 'gadjet/src/style/bg-color';

import { color } from './color';

// import * as adapter from "../src/adapter";

const define = adapter.define;
const Adapter = adapter.Adapter;
const addStyle = adapter.addStyle;

hljs.registerLanguage('js', javascript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('shell', shell);
hljs.registerLanguage('ts', typescript);
hljs.highlightAll();


addStyle`
html {
    font-family: fira-sans;
    ${fontFluid({
        vwMax: 1000,
        fontSizeMin: 14,
        fontSizeMax: 20
    })}
    line-height: 1.7
}

body {
    margin: 0;
}

h1, h2, h3 {
    width: 100%;
}

p {
    max-width: 45rem;
}

pre {
    width: 100%;
    font-size: 0.8rem;
    line-height: 1.5;
}

code {
    ${bgColor('#5e5c64')}
    color: white;
    padding: 0.1rem 0.25rem 0.2rem 0.25rem;
    border-radius: 5px;
    font-size: 0.8rem;
}

.container {
    margin: auto;
    max-width: 1000px;
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
`;


class Nav extends Adapter {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        return render(this, html`
        <div class="container">
            <a href=${`${this.dataset.toRoot}index.html`}>Intro</a>
            <a href=${`${this.dataset.toRoot}usage/usage.html`}>Usage</a>
            <a href=${`${this.dataset.toRoot}api/api.html`}>API</a>
        </div>
        `)
    }
};
define('el-nav', Nav);
Nav.tagStyle(`
    display: flex;
    width: 100%;
    ${bgColor(color.p)}
    a {
        padding: 0.5rem 1rem;
        text-decoration: none;
        font-weight: bold;
        cursor: pointer;
        ${bgColor(color.p)}
        &:hover {
            ${bgColor('white')}
        }
    }
`);


class Paragraph extends Adapter {};
define('el-paragraph', Paragraph);
Paragraph.tagStyle(`
    .container {
        max-width: 45rem;
        width: 90%;
        display: flex;
        justify-content: left;
    }

    h1, h2, h3 {
        & + * {
            margin-top: 0;
        }
        & + p {
            margin-top: 0;
        }
    }

    h2 + hr {
        margin-top: -1rem;
        margin-bottom: 0;
        height: 2px;
        width: 100%;
        border: 0;
        box-sizing: border-box;
        ${bgColor(color.p2)}
    }

    p {
        margin-top: 1rem;
        width: 100%;
        max-width: 45rem;
    }

    p + p {
        margin-top: 0;
    }

    p:has(code.tag) {
        margin-bottom: 0;
        > code.tag {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            min-width: 2rem;
            display: inline-flex;
            justify-content: center;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
            ${bgColor(color.p2)}
            font-weight: bold;
        }
        & + pre {
            margin-top: 0;
            code {
                border-top-left-radius: 0;
            }
        }
    }

    p + pre {
        margin-top: 0;
    }

    ol {
        padding-left: 1.7rem;
        margin-top: 0rem;
    }

    blockquote {
        margin: 0;
        padding: 0;
        padding-left: 1rem;
        border-left: 5px solid ${color.p2};
    }

    pre + p {
        margin-top: 0;
    }
`);

class ID_Highlight extends Adapter {};
define('id-highlight', ID_Highlight);
ID_Highlight.tagStyle(`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: ${color.p3};
    color: white;
    .container {
        width: 90%;
        max-width: 600px;
        margin: 2rem;
        text-align: center;
        border: 7px double white;
        > h1 {
            width: 100%;
        }
    }
`);

class ID_Footer extends Adapter {};
define('id-footer', ID_Footer);
ID_Footer.tagStyle(`
    display: flex;
    min-height: 30vh;
    width: 100%;
`);