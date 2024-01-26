import { uuid } from './util.js';
import { stylis } from './cssProcessor/stylis.bundle.js';
import { IsolatorMixin } from './isolator.js';


interface _HTMLElement extends HTMLElement {
  connectedCallback?(): void;
  disconnectedCallback?(): void;
}

export class _Adapter {
  static adapterClass?: any;

  static cssStyleSheet: CSSStyleSheet;

  static tagName?: string;

  static styles: string[];

  /**
   * CSS Processing middleware, This function will be called
   * before applying CSS to CSSStyleSheet.
   */
  static cssProcess(css: string): string {
    return css;
  }

  static get allStyles(): string[] {
    let superClass = Object.getPrototypeOf(this.adapterClass);
    const allStyles = [];

    while (superClass.adapter) {
      allStyles.push(...superClass.adapter.styles);
      superClass = Object.getPrototypeOf(superClass);
    }
    allStyles.push(...this.styles);
    return allStyles;
  }

  /** Retreive inherited styles for all super classes. */
  static get allCSS(): string {
    return this.allStyles.join("\n");
  }

  /** Set CSS for this component */
  static set css(css: string) {
    this.styles = [css];

    if (this.tagName) {
      this.cssStyleSheet.replaceSync(
        this.cssProcess(`${this.tagName} { ${this.allCSS} }`)
      );
    }
  }

  /** Get CSS for this component, includes inherited styles */
  static get css(): string {
    return this.styles.join("\n");
  }

  /** Add style to this component */
  static addStyle(css: string) {
    this.styles.push(css);

    if (this.tagName) {
      const rule = `${this.tagName} { ${css} }`;
      const processedCss = this.cssProcess(rule);
      this.cssStyleSheet.insertRule(
        processedCss,
        this.cssStyleSheet.cssRules.length
      );
    }
  }

  /**
     * Define component to element tag and init component style.
     * To extends this function, sub-elements must be defined
     * before call this function as `super.define(tagName);`
     */
  static define(tagName: string): void {
    this.tagName = tagName;
    customElements.define(tagName, this.adapterClass);
    this.initStyle();
  }

  /** Init component style */
  static initStyle() {
    this.cssStyleSheet.replaceSync(
      this.cssProcess(`${this.tagName} { ${this.allCSS} }`)
    );
    document.adoptedStyleSheets.push(this.cssStyleSheet);
  }

  _class: typeof _Adapter;

  adapterObject: any;

  cssStyleSheet?: CSSStyleSheet;

  uuid?: string;

  styles: string[] = [];

  cssObserver!: MutationObserver;

  constructor() {
    this._class = this.constructor as typeof _Adapter;
    this._class.cssStyleSheet = new CSSStyleSheet();
    this._class.tagName = undefined;
    this._class.styles = [];
  }

}

type Constructor<T = {}> = new (...args: any[]) => T;

export function AdapterMixin<TBase extends Constructor<_HTMLElement>>(
  Base: TBase
) {
  return class Adapter extends Base {
    static _adapter: _Adapter;

    static get adapter(): _Adapter {
      if (this._adapter === Object.getPrototypeOf(this)._adapter) {
        this._adapter = new _Adapter();
        this._adapter._class.adapterClass = this;
      }
      return this._adapter;
    }

    /** CSS Process middleware, This function will be called
     * before applying CSS to CSSStyleSheet.
     */
    static cssProcess(css: string): string {
      return this.adapter._class.cssProcess(css);
    }

    /** Add style to this component */
    static addStyle(css: string) {
      this.adapter._class.addStyle(css);
    }

    /**
     * Define component to element tag and init component style.
     * To extends this function, sub-elements must be defined
     * before call this function as `super.define(tagName);`
     */
    static define(tagName: string): void {
      this.adapter._class.define(tagName);
    }

    _class!: typeof Adapter; // instance's class for using as shortcut

    _cssStyleSheet?: CSSStyleSheet;

    _uuid?: string;

    _styles: string[] = [];

    _cssObserver!: MutationObserver;

    /**
     * In constructor, there any some if condition to check
     * if it has been inited or not to prevent recursive call in Mixin
     */
    constructor(...args: any[]) {
      super(...args);
      if (!this._class) { this.initClass() };
      this.cssObserve(true);
    }

    /** Retreive styles for this object */
    get styles(): string[] {
      return this._styles;
    }

    /** Retreive styles from class and object */
    get allStyles(): string[] {
      return [...this.styles, ...this._class.allStyles];
    }

    get cssObserver() {
      if (this._cssObserver) { return this._cssObserver };

      this._cssObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.attributeName === 'css') {
            this.css = this.getAttribute('css') || '';
          };
        };
      });
      return this._cssObserver;
    }

    /** Dynamically create and return uuid for the element */
    get uuid(): string {
      if (this._uuid) { return this._uuid };
      this._uuid = `${this.tagName}-${uuid()}`;
      return this._uuid;
    }

    /**
     * Dynamically create a CSSStyleSheet() and keep track of the adopted
     * stylesheet index for reference.
     */
    get cssStyleSheet() {
      if (this._cssStyleSheet) { return this._cssStyleSheet };
      this._cssStyleSheet = new CSSStyleSheet();
      return this._cssStyleSheet;
    }

    /**
     * Return a selector for the this element as a class chain.
     */
    get objectClassSelector(): string {
      return this.classList.value.replace(/ /g, ".");
    }

    /**
     * Set CSS for this element.
     * It works like `<el style="">` but with CSS processor.
     */
    set css(css: string) {
      this._styles = [css];
      this.classList.add(this.uuid);

      /** Init cssStyleSheet if it hasn't been inited yet.
       * This will make `this.objectClassSelector` works as expeced.
       */
      this.cssStyleSheet;
      const processedCss = this._class.cssProcess(
        `${this.tagName}.${this.objectClassSelector} { ${css} }`
      );
      
      this.cssStyleSheet.replaceSync(processedCss);
    }

    /** Get CSS for this element */
    get css(): string {
      let css = this.getAttribute("css") || "";
      if (css) { return css };
      for (const rule of this.cssStyleSheet.cssRules) {
        css += rule.cssText + "\n";
      }
      return css;
    }

    initClass() {
      this._class = this.constructor as unknown as typeof Adapter;

      /**
       * If class tagName has been defined from somewhere else.
       * Then it shouldn't be initialized again.
       */
      if (this._class.adapter._class.tagName) {
        return;
      }
      this._class._tagName = this.tagName;
      this._class.initStyle();
    }

    connectedCallback() {
      super.connectedCallback ? super.connectedCallback() : null;
      /** Apply css if it's set in attributes */
      const css = this.getAttribute('css');
      if (css) { this.css = css };

      const rootNode = this.getRootNode() as Document|ShadowRoot;
      if (rootNode.adoptedStyleSheets.indexOf(this.cssStyleSheet) === -1) {
        rootNode.adoptedStyleSheets.push(
          this._class.cssStyleSheet,
          this.cssStyleSheet
        );
      }
    }

    /** Enable or disable CSS Observation */
    cssObserve(enable: boolean) {
      if (enable) {
        this.cssObserver.observe(this, { attributes: true });
      } else {
        this.cssObserver.disconnect();
      }
    }

    /** Add style for this element */
    addStyle(css: string): void {
      this._styles = this._styles.concat(css);
      this.classList.add(this.uuid);

      // Init cssStyleSheet if it hasn't been inited yet.
      this.cssStyleSheet;
      const processedCss = this._class.cssProcess(
        `${this.tagName}.${this.objectClassSelector} { ${css} }`
      );

      this.cssStyleSheet.insertRule(
        processedCss,
        this.cssStyleSheet.cssRules.length
      );
    }

    /** Remove the element from DOM and remove adoptedStyleSheet */
    remove() {
      const rootNode = this.getRootNode() as Document|ShadowRoot;
      const i = rootNode.adoptedStyleSheets.indexOf(this.cssStyleSheet);
      rootNode.adoptedStyleSheets.splice(i, 1);
      super.remove();
    }
  };
}

export class Adapter extends IsolatorMixin(AdapterMixin(HTMLElement)) {
  static cssProcess(css: string): string {
    return stylis(css);
  }
}
