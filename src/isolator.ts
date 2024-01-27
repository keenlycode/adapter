import { HTMLElementInterface } from "./util"


class Isolator {

  element!: HTMLElementInterface;

  host?: HTMLElement;

  hostShadowRoot?: ShadowRoot;

  constructor(element: HTMLElementInterface) {
    this.element = element;
    this.isolation ? this._isolate(this.isolation) : null;
  }

  get isolation(): ShadowRootMode {
    let isolation = this.element.getAttribute('isolation');
    if (isolation === '') {
      isolation = 'open';
    }
    return isolation as ShadowRootMode;
  }

  isolate(mode: ShadowRootMode): HTMLElement {
    this.element.setAttribute('isolation', mode);
    return this._isolate(mode);
  }

  _isolate(mode: ShadowRootMode): HTMLElement {
    const host = document.createElement('div');
    const shadowRoot = host.attachShadow({ mode: mode });
    this.element.insertAdjacentElement('beforebegin', host);
    shadowRoot.append(this.element);
    this.host = host;
    this.hostShadowRoot = shadowRoot;
    return host;
  }
}


type Constructor<T = {}> = new (...args: any[]) => T;

export function IsolatorMixin<TBase extends Constructor<HTMLElementInterface>>(
  Base: TBase
) {
  return class _Isolator extends Base {

    _isolator: Isolator;

    constructor(...args: any[]) {
      super(...args);
      this._isolator = new Isolator(this);
    }

    isolate(mode: ShadowRootMode = 'open'): HTMLElement {
      return this._isolator.isolate(mode);
    }

    connectedCallback() {
      super.connectedCallback ? super.connectedCallback() : null;
      if (!this._isolator.host) {
        /** Not isolated */

        return;
      };
      if ( (this.getRootNode() as ShadowRoot).host !== this._isolator.host ) {
        /** On move without host */

        const host = this._isolator.host;
        this._isolator.host = undefined;
        this.insertAdjacentElement('beforebegin', host);
        this._isolator.hostShadowRoot?.append(this);
        this._isolator.host = host;
      }
    }

    disconnectedCallback() {
      if (!this._isolator.host) {
        /** Not isolated */
        return super.disconnectedCallback ? super.disconnectedCallback() : null;
      };
      if (this.getRootNode() === this) {
        /** On remove */
        this._isolator.host.remove();
      };
      if (!((this.getRootNode() as ShadowRoot).host === this._isolator.host)) {
        /** On move without host */
        this._isolator.host.remove();
      }
      super.disconnectedCallback ? super.disconnectedCallback() : null;
    }
  };
}
