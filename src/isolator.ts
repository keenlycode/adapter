type Constructor<T = {}> = new (...args: any[]) => T;

export function IsolatorMixin<TBase extends Constructor<HTMLElement>>(
  Base: TBase
) {
  return class Isolator extends Base {
    _isolator?: HTMLElement;
    _hostShadowRoot?: ShadowRoot;

    isolated(mode: "open" | "closed" = "open") {
      if (this.isIsolated) {
        return;
      };
      const isolator = document.createElement("div");
      const shadowRoot = isolator.attachShadow({ mode: mode });
      this._isolator = isolator;
      this.insertAdjacentElement("beforebegin", isolator);
      shadowRoot.append(this);
      this._hostShadowRoot = shadowRoot;
    }

    get isIsolated() {
      const host = (this.getRootNode() as ShadowRoot).host;
      if (host === undefined) {
        return false;
      }
      if (host == this._isolator) {
        return true;
      }
    }

    attachIsolator() {
      this.insertAdjacentElement("beforebegin", this._isolator!);
      this._hostShadowRoot?.append(this);
    }

    remove() {
      this.isolator?.remove();
    }

    connectedCallback() {
      console.log("connectedCallback");
      /** Initial isolation */
      if (this._isolator === undefined) {
        this.isolated();
      }
      /** Check isolation state and attach if needed */
      if (!this.isIsolated) {
        this.attachIsolator();
      }
      return super.connectedCallback();
    }
    disconnectedCallback() {
      console.log("disconnectedCallback");
    }
  };
}
