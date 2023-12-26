import { CodeBlock } from './_ux/ui/code-block';
import { Sidebar } from './_ux/ui/sidebar';
import { Button } from 'gadjet/src/gadjet';
import { DefIcon } from '@devcapsule/deficon';

function baseComponents(to_base_url: string) {
    const __base_url = new URL(import.meta.url);

    const icomoon_url = new URL(
        'asset/icon/icomoon/symbol-defs.svg', __base_url
    ).toString();

    class Icon extends DefIcon({url: icomoon_url}) {};
    customElements.define('el-icon', Icon);

    CodeBlock.define('el-code-block');
    Button.define('button');
};

export { baseComponents };