import { DefIcon, AdapterMixin } from './lib/lib.export.bundle.js';

import {
  CodeBlock,
  BlockQuote,
  Button, buttonStyle,
  color,
} from './ux.js';

function baseComponents() {
  const __base_url = new URL(import.meta.url);

  const icomoon_url = new URL(
    'asset/icon/icomoon/symbol-defs.svg', __base_url
  ).toString();

  class Icon extends AdapterMixin(DefIcon({ url: icomoon_url })) {
    static css = /*css*/`
      & {
        display: inline-flex;
        justify-content: center;
        align-items: center;
      }
    `;
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