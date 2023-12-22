import { Adapter } from '@devcapsule/adapter/src/adapter';
import { bgColor } from 'gadjet/src/gadjet';
import { color } from '../designToken'; 

class CodeBlock extends Adapter {};

const css = String.raw;

CodeBlock.tagStyle(css`
    display: block;
    margin: auto;
    margin-top: 1.5rem;
    max-width: 40rem;
    line-height: 1.5;
    [el="bar-top-left"] {
        display: inline-flex;
        ${bgColor(color.yellow)}
        border-top-left-radius: 0.4em;
        border-top-right-radius: 0.4em;
        line-height: 2;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        font-size: 0.8rem;
    }
    & pre {
        margin-top: 0;
        font-size: 0.8rem;
        & code {
            all: unset;
            border-bottom-left-radius: 0.4em;
            border-bottom-right-radius: 0.4em;
            border-top-right-radius: 0.4em;
        }
    }
`)

export { CodeBlock };