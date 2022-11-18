import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript.js';
import css from 'highlight.js/lib/languages/css.js';
import 'highlight.js/styles/base16/solarized-light.css';

import 'normalize.css';

import { fontFluid } from 'gadjet/src/style/font-fluid';
import { bgColor } from 'gadjet/src/style/bg-color';

import { addStyle, define, Adapter } from "../src/adapter";
import { color } from './color';


hljs.registerLanguage('js', javascript);
hljs.registerLanguage('css', css);
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

class Nav extends Adapter {};
define('el-nav', Nav);
Nav.tagStyle(`
    display: flex;
    width: 100%;
    ${bgColor('blue')}
    cursor: pointer;
    span {
        padding: 0.5rem 1rem;
        &:hover {
            ${bgColor('white')}
        }
    }
`)

class Paragraph extends Adapter {};
define('el-paragraph', Paragraph);
Paragraph.tagStyle(`
    .container {
        max-width: 45rem;
        width: 90%;
        display: flex;
        justify-content: left;
    }
    h1, h2 {
        & + p {
            margin-top: 0;
        }
    }

    p {
        margin-top: 1rem;
        width: 100%;
        max-width: 45rem;
    }
    p + p {
        margin-top: 0;
    }
    ol {
        padding-left: 1.7rem;
        margin-top: 0rem;
    }
`)

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
`)


class ID_Footer extends Adapter {};
define('id-footer', ID_Footer);
ID_Footer.tagStyle(`
    display: flex;
    min-height: 30vh;
    width: 100%;
`)