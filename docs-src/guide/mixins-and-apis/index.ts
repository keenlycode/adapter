import { AdapterMixin, stylis } from '../../adapter';

import { color } from '../../_ux/designToken';

class API extends AdapterMixin(HTMLElement) {
  static cssProcess(css) { return stylis(css) }
  static { this.css = `
    display: block;
    border-left: 5px solid ${color.green};
    border-bottom-left-radius: 0.4em;
    padding: 1rem 0 1rem 1rem;
    h4 {
      margin-bottom: 1rem;
    }
    hr {
      margin: 1.5rem 0 1.5rem 0;
    }
  `};
}

API.define('el-api');