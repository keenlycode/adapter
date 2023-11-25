import { addStyle, css } from "@devcapsule/adapter/src/export";
import { fontFluid } from 'gadjet/src/gadjet';

import { CodeBlock } from './_ux/ui/code-block';
import './_ux/style';

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
import shell from 'highlight.js/lib/languages/shell';
import 'highlight.js/styles/monokai.css';

new EventSource('/esbuild').addEventListener(
    'change',
    () => location.reload());

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('shell', shell);
hljs.highlightAll();

CodeBlock.define('el-code-block');

addStyle(css`

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