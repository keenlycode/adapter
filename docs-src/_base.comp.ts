import { CodeBlock } from './_ux/ui/code-block';
import { BlockQuote } from './_ux/ui/blockquote';
import { Button } from './_ux/ui/button';
import { Icon as _Icon } from './_ux/ui/icon';

const __base_url = new URL(import.meta.url);

function baseComponents() {
  const icomoon_url = new URL(
    'asset/icon/icomoon/symbol-defs.svg', __base_url
  ).toString();

  const Icon = _Icon(icomoon_url);
  Icon.define('el-icon');

  CodeBlock.define('el-code-block');

  Button.define('el-button');

  Button.addStyle(/*css*/`
    el-icon {
      margin-top: -0.17rem;
    }
  `);

  BlockQuote.define('el-blockquote');
};

baseComponents();