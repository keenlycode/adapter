import { addStyle, css } from "@devcapsule/adapter/src/export";
import { fontFluid } from './_esm/style/font-fluid';

import { CodeBlock } from './_ux/ui/code-block';
import './_ux/style';

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/monokai.css';

hljs.registerLanguage('javascript', javascript);
hljs.highlightAll();

CodeBlock.define('el-code-block');

addStyle(css`
body {
    padding-bottom: 10rem;
    ${fontFluid({
        fontSizeMin: 13,
        fontSizeMax: 20
    })}
}

.width-100 {
    width: 100%;
}

.container {
    display: block;
    max-width: 1000px;
    min-width: 300px;
    width: 90%;
    margin: auto;

    & h2 {
        line-height: 2;
        text-align: center;
    }
}

p {
    max-width: 45rem;
    margin: auto;
}

`);