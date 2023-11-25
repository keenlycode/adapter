import { addStyle, css } from "@devcapsule/adapter/src/export";
import { fontFluid } from 'gadjet/src/gadjet';

import { CodeBlock } from './_ux/ui/code-block';
import './_ux/style';

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import shell from 'highlight.js/lib/languages/shell';
import 'highlight.js/styles/monokai.css';

new EventSource('/esbuild').addEventListener(
    'change',
    () => location.reload());

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('shell', shell);
hljs.highlightAll();

CodeBlock.define('el-code-block');