import { bgColor, fontFluid } from "gadjet/src/gadjet";
import { css } from '@devcapsule/adapter/src/style';
import { color } from "./_ux/designToken";


function baseStyle(to_base_url: string) {
    const __base_url = new URL(import.meta.url);
    const __fira_sans_url = new URL(`${to_base_url}asset/font/FiraSans-Regular.ttf`, __base_url.href);
    const __fira_code_url = new URL(`${to_base_url}asset/font/FiraCode-Variable.ttf`, __base_url.href);

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

    html {
        line-height: 1.75;
        font-family: sans;
        ${fontFluid({
            fontSizeMin: 14,
            fontSizeMax: 20,
            vwMin: 300,
            vwMax: 1200
        })}
    }

    body {
        margin: 0;
        padding: 0;
        padding-bottom: 10rem;
    }

    code {
        padding: 0.1rem 0.5rem;
        ${bgColor(color.light)}
        border-radius: 0.25em;
        font-family: monospace;
        font-size: 0.8em;
    }

    p, h1, h2, h3, h4, ul, li {
        max-width: 80ch;
        margin: auto;
    }

    .width-100 {
        width: 100%;
    }

    .text-width {
        width: 100%;
        max-width: 40rem;
    }

    .flex {
        display: flex;
        flex-wrap: wrap;
    }
    `);
}

export { baseStyle };