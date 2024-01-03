import { bgColor, fontFluid } from "gadjet/src/gadjet";
import { color } from "./_ux/designToken";
import { stylis } from "@devcapsule/adapter";


function baseStyle(to_base_url: string) {
    const __base_url = new URL(import.meta.url);
    const __fira_sans_url = new URL(`${to_base_url}asset/font/FiraSans-Regular.ttf`, __base_url.href);
    const __fira_code_url = new URL(`${to_base_url}asset/font/FiraCode-Variable.ttf`, __base_url.href);

    const style = new CSSStyleSheet();
    document.adoptedStyleSheets.push(style);
    style.replaceSync(stylis(/*css*/`
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
            fontSizeMin: 16,
            fontSizeMax: 18,
            vwMin: 400,
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
        font-size: 0.85em;
    }

    p, h1, h2, h3, h4, ul, li {
        max-width: 80ch;
        margin: auto;
    }

    p ~ ol {
        margin-top: -0.7rem;
    }

    p ~ ol ~ p {
        margin-top: -0.7rem;
    }

    .width-100 {
        width: 100%;
    }

    .text-width {
        width: 100%;
        max-width: 80ch;
    }

    .container {
        display: block;
        max-width: 1000px;
        min-width: 300px;
        width: 90%;
        margin: auto;

        h1, h2, h3 {
            max-width: 45rem;
        }

        & h2 {
            line-height: 2;
            text-align: center;
            margin: auto;
            margin-top: 3rem;
            margin-bottom: 2rem;
            font-size: 1.5rem;
        }
        & h3 {
            text-decoration: underline;
            margin: auto;
            margin-top: 2rem;
            margin-bottom: 1rem;
            font-size: 1.25rem;
        }
        & h4 {
            font-size: 1rem;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
        }
    }

    .flex {
        display: flex;
        flex-wrap: wrap;
    }
    `));
}

export { baseStyle };