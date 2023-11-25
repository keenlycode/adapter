import { addStyle, css } from "@devcapsule/adapter/src/export";
import { bgColor } from "../_esm/style/bg-color";
import { palette } from "./color";

addStyle(css`

html {
    line-height: 1.75;
}

code {
    padding: 0.1rem 0.5rem;
    ${bgColor(palette.light)}
    border-radius: 0.25em;
    font-size: 0.8em;
}
`);