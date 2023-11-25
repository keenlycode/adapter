import { Adapter, css } from '@devcapsule/adapter/src/export';
import { bgColor } from '../_style/bg-color';
import { palette } from '../_style/color'; 

class CodeBlock extends Adapter {};

CodeBlock.tagStyle(css`
    display: block;
    margin: auto;
    margin-top: 1.5rem;
    max-width: 50rem;
    [el="bar-top-left"] {
        display: inline-flex;
        ${bgColor(palette.yellow)}
        border-top-left-radius: 0.4em;
        border-top-right-radius: 0.4em;
        line-height: 1.8;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        font-size: 0.9em;
    }
    & pre {
        margin-top: 0;
        font-size: 0.85em;
        & code {
            border-bottom-left-radius: 0.4em;
            border-bottom-right-radius: 0.4em;
            border-top-right-radius: 0.4em;
        }
    }
`)

export { CodeBlock };