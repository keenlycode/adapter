import { addStyle, css } from "@devcapsule/adapter/src/export";
import { bgColor, fontFluid } from "gadjet/src/gadjet";
import { palette } from "./color";

addStyle(css`

html {
    line-height: 1.75;
}

body {
    padding-bottom: 10rem;
    ${fontFluid({
        fontSizeMin: 13,
        fontSizeMax: 18
    })}
}

code {
    padding: 0.1rem 0.5rem;
    ${bgColor(palette.light)}
    border-radius: 0.25em;
    font-size: 0.8em;
}

p {
    max-width: 45rem;
    margin: auto;
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
        margin: auto;
        margin-top: 3rem;
        margin-bottom: 2rem;
        max-width: 45rem;
    }
    & h3 {
        text-decoration: underline;
        max-width: 45rem;
        margin: auto;
        margin-top: 2rem;
        margin-bottom: 1rem;
    }
}
`);