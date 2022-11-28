import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript.js';
import css from 'highlight.js/lib/languages/css.js';
import shell from 'highlight.js/lib/languages/shell.js';
import typescript from 'highlight.js/lib/languages/typescript.js';
import 'highlight.js/styles/base16/solarized-light.css';

import { fontFluid } from 'gadjet/src/style/font-fluid';
import { bgColor } from 'gadjet/src/style/bg-color';

import { addStyle, define, Adapter } from '@nitipit/adapter/src/adapter';

import './_component/nav';
import './_component/paragraph';
import './_component/id-header';
import './_component/id-footer';
import './_component/icon';

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