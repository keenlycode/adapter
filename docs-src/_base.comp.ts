import { DefIcon } from '@devcapsule/deficon';
import { AdapterMixin } from '@devcapsule/adapter';

import { CodeBlock } from './_ux/ui/code-block';
import { BlockQuote } from './_ux/ui/blockquote';
import { Button, buttonStyle } from './_ux/ui/button';
import { color } from './_ux/designToken';

function baseComponents(to_base_url: string) {
    const __base_url = new URL(import.meta.url);

    const icomoon_url = new URL(
        'asset/icon/icomoon/symbol-defs.svg', __base_url
    ).toString();

    class Icon extends AdapterMixin(DefIcon({url: icomoon_url})) {
        static css = /*css*/`
            & {
                display: inline-flex;
                justify-content: center;
                align-items: center;
            }
        `
    };
    Icon.define('el-icon');

    CodeBlock.define('el-code-block');
    Button.define('el-button');
    Button.css = /*css*/`
        & {
            ${buttonStyle(color.blue)}
        }
        button {
            min-height: 2em;
        }
        el-icon {
            margin-top: -0.17rem;
        }
    `;
    BlockQuote.define('el-blockquote');
};

export { baseComponents };