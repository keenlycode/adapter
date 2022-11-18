import { bgColor } from 'gadjet/src/style/bg-color';

import { define, Adapter } from "../src/adapter";
import { color } from './color';


class ID_Highlight extends Adapter {};
define('id-highlight', ID_Highlight);
ID_Highlight.tagStyle(`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: ${color.p3};
    color: white;
    .container {
        width: 90%;
        max-width: 600px;
        margin: 2rem;
        text-align: center;
        border: 7px double white;
        > h1 {
            width: 100%;
        }
    }
`)

class Nav extends Adapter {};
define('el-nav', Nav);
Nav.tagStyle(`
    display: flex;
    width: 100%;
    ${bgColor(color.p)}
    cursor: pointer;
    a {
        padding: 0.5rem 1rem;
        text-decoration: none;
        font-weight: bold;
        ${bgColor(color.p)}
        &:hover {
            ${bgColor('white')}
        }
    }
`)

class Paragraph extends Adapter {};
define('el-paragraph', Paragraph);
Paragraph.tagStyle(`
    .container {
        max-width: 45rem;
        width: 90%;
        display: flex;
        justify-content: left;
    }
    h1, h2 {
        & + p {
            margin-top: 0;
        }
    }

    p {
        margin-top: 1rem;
        width: 100%;
        max-width: 45rem;
    }
    p + p {
        margin-top: 0;
    }
    ol {
        padding-left: 1.7rem;
        margin-top: 0rem;
    }
`)


class ID_Footer extends Adapter {};
define('id-footer', ID_Footer);
ID_Footer.tagStyle(`
    display: flex;
    min-height: 30vh;
    width: 100%;
`)