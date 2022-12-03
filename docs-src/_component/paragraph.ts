import { define, Adapter } from '@nitipit/adapter/src/adapter';

import { bgColor } from 'gadjet/src/style/bg-color';

import { color } from '../color';

class Paragraph extends Adapter {};
Paragraph.define('el-paragraph');
Paragraph.tagStyle(`
    .container {
        max-width: 45rem;
        width: 90%;
        display: flex;
        justify-content: left;
    }

    h1, h2, h3 {
        & + * {
            margin-top: 0;
        }
        & + p {
            margin-top: 0;
        }
    }

    h2 + hr {
        margin-top: -1rem;
        margin-bottom: 0;
        height: 2px;
        width: 100%;
        border: 0;
        box-sizing: border-box;
        ${bgColor(color.p2)}
    }

    p {
        margin-top: 1rem;
        width: 100%;
        max-width: 45rem;
    }

    p + p {
        margin-top: 0;
    }

    p:has(code.tag) {
        margin-bottom: 0;
        > code.tag {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            min-width: 2rem;
            display: inline-flex;
            justify-content: center;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
            ${bgColor(color.p2)}
            font-weight: bold;
        }
        & + pre {
            margin-top: 0;
            code {
                border-top-left-radius: 0;
            }
        }
    }

    p + pre {
        margin-top: 0;
    }

    ol {
        padding-left: 1.7rem;
        margin-top: 0rem;
    }

    blockquote {
        margin: 0;
        padding: 0;
        padding-left: 1rem;
        border-left: 5px solid ${color.p2};
    }

    pre + p {
        margin-top: 0;
    }

    a {
        text-decoration: underline;
    }
`);