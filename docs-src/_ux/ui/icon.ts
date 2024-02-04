import { DefIcon } from '@devcapsule/deficon';
import { AdapterMixin, stylis } from '../../adapter';


export function Icon(icomoon_url) {
  return class extends AdapterMixin(DefIcon({ url: icomoon_url })) {
    static cssProcess(css) {
      return stylis(css);
    }

    static css = /*css*/`
      & {
        display: inline-flex;
        justify-content: center;
        align-items: center;
      }
    `;
  };
}