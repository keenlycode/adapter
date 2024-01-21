interface _HTMLElement extends HTMLElement {
  connectedCallback?(): void;
  disconnectedCallback?(): void;
}

type Constructor<T = {}> = new (...args: any[]) => T;

export function IsolatorMixin<TBase extends Constructor<_HTMLElement>>(
  Base: TBase
) {
  return class Isolator extends Base {

    _host?: HTMLElement;

    _hostShadowRoot?: ShadowRoot;

    constructor(...args: any[]) {
      super(...args);
      this.isolation ? this._isolate(this.isolation) : null;
    }

    get isolation(): ShadowRootMode {
      let isolation = this.getAttribute('isolation');
      if (isolation === '') {
        isolation = 'open';
      }
      return isolation as ShadowRootMode;
    }

    isolate(mode: ShadowRootMode = 'open') {
      this.setAttribute('isolation', mode);
      return this._isolate(mode);
    }

    _isolate(mode: ShadowRootMode) {
      const host = document.createElement('div');
      const shadowRoot = host.attachShadow({ mode: mode });
      this.insertAdjacentElement('beforebegin', host);
      shadowRoot.append(this);
      this._host = host;
      this._hostShadowRoot = shadowRoot;
      return host;
    }

    connectedCallback() {
      super.connectedCallback ? super.connectedCallback() : null;
      if (!this._host) {
        /** Not isolated */
        return;
      };
      if ( (this.getRootNode() as ShadowRoot).host !== this._host ) {
        /** On move without host */
        const host = this._host;
        this._host = undefined;
        this.insertAdjacentElement('beforebegin', host);
        this._hostShadowRoot?.append(this);
        this._host = host;
      }
    }

    disconnectedCallback() {
      if (!this._host) {
        /** Not isolated */
        return super.disconnectedCallback ? super.disconnectedCallback() : null;
      };
      if (this.getRootNode() === this) {
        /** On remove */
        this._host.remove();
      };
      if (!((this.getRootNode() as ShadowRoot).host === this._host)) {
        /** On move without host */
        this._host.remove();
      }
      super.disconnectedCallback ? super.disconnectedCallback() : null;
    }
  };
}
