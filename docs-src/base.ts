import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import shell from 'highlight.js/lib/languages/shell';
import 'highlight.js/styles/monokai.css';

import { DefIcon } from '@devcapsule/deficon';

import { CodeBlock } from './_ux/ui/code-block';
import './_ux/style';

const __base_url = new URL(import.meta.url);
const __event_source = new URL('./esbuild', __base_url.href)

if (['0.0.0.0', '127.0.0.1', 'localhost'].includes(__base_url.hostname)) {
    new EventSource(__event_source).addEventListener(
        'change',
        () => location.reload());
}

const icomoon_url = new URL(
    'asset/icon/icomoon/symbol-defs.svg', __base_url
).toString();

class Icon extends DefIcon({url: icomoon_url}) {};

customElements.define('el-icon', Icon);

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('shell', shell);
hljs.highlightAll();

const __fira_sans_url = new URL('./asset/font/FiraSans-Regular.ttf', __base_url.href);
const __fira_code_url = new URL('./asset/font/FiraCode-Variable.ttf', __base_url.href);
const css = String.raw;


const style = new CSSStyleSheet();
document.adoptedStyleSheets.push(style);

style.replaceSync(css`
@font-face {
    font-family: sans;
    src: url(${__fira_sans_url});
}

@font-face {
    font-family: monospace;
    src: url(${__fira_code_url});
}
`)

CodeBlock.define('el-code-block');