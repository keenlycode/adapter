import { addStyle, css } from "@devcapsule/adapter/src/export";
import { CodeBlock } from './_ui/code-block'

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/monokai.css';

hljs.registerLanguage('javascript', javascript);
hljs.highlightAll();

CodeBlock.define('el-code-block');

export interface FontFluidParam {
    vwMin?: number,
    vwMax?: number,
    fontSizeMin?: number,
    fontSizeMax?: number
}

export const fontFluid = ({
    vwMin = 300, vwMax = 1200,
    fontSizeMin = 16, fontSizeMax = 18
}: FontFluidParam = {}): string => {
    let viewportRatio = `(100vw - ${vwMin}px) / (${vwMax} - ${vwMin})`;
    let fontScaleRatio = `(${fontSizeMax} - ${fontSizeMin}) * ${viewportRatio}`;
    return css`
    font-size: ${fontSizeMin}px;
    @media screen and (min-width: ${vwMin}px) {
        font-size: calc(
            ${fontSizeMin}px + ${fontScaleRatio}
        );
    }
    @media screen and (min-width: ${vwMax}px) {
        font-size: ${fontSizeMax}px;
    }
    `.trim();
};

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