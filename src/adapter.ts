import { uuid } from './util.js';
import { stylis } from './cssProcessor/stylis.bundle.js';
import { IsolatorMixin } from './isolator.js';


interface _HTMLElement extends HTMLElement {
  connectedCallback?(): void;
  disconnectedCallback?(): void;
}

class AdapterClass {

  adapterClass?: any;

  cssStyleSheet: CSSStyleSheet = new CSSStyleSheet();

  tagName?: string;

  styles: string[] = [];

  /** Retreive styles including all super classes */
  get allStyles(): string[] {
    let superClass = Object.getPrototypeOf(this.adapterClass);
    const allStyles = [];

    while (superClass.adapter) {
      allStyles.push(...superClass.adapter.styles);
      superClass = Object.getPrototypeOf(superClass);
    }
    allStyles.push(...this.styles);
    return allStyles;
  }

  /** Retreive inherited CSS including all super classes. */
  get allCSS(): string {
    return this.allStyles.join("\n");
  }

  /** Set CSS for this component */
  set css(css: string) {
    this.styles = [css];

    if (this.tagName) {
      this.cssStyleSheet.replaceSync(
        this.adapterClass.cssProcess(`${this.tagName} { ${this.allCSS} }`)
      );
    }
  }

  /** Get CSS for this component, includes inherited styles */
  get css(): string {
    return this.styles.join("\n");
  }

  /** Add style to this component */
  addStyle(css: string) {
    this.styles.push(css);

    if (this.tagName) {
      const rule = `${this.tagName} { ${css} }`;
      const processedCss = this.adapterClass.cssProcess(rule);
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
  define(tagName: string): void {
    this.tagName = tagName;
    customElements.define(tagName, this.adapterClass);
    this.initStyle();
  }

  /** Init component style */
  initStyle() {
    this.cssStyleSheet.replaceSync(
      this.adapterClass.cssProcess(`${this.tagName} { ${this.allCSS} }`)
    );
    document.adoptedStyleSheets.push(this.cssStyleSheet);
  }
}

class AdapterObject {
  adapterObject: any;

  cssStyleSheet: CSSStyleSheet = new CSSStyleSheet();

  _uuid?: string;

  styles: string[] = [];

  _cssObserver!: MutationObserver;

  _class: typeof Adapter;

  get uuid(): string {
    if (this._uuid) { return this._uuid };
    this._uuid = `${this.adapterObject.tagName}-${uuid()}`;
    return this._uuid;
  }

  get cssObserver() {
    if (this._cssObserver) { return this._cssObserver };

    this._cssObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'css') {
          this.adapterObject.css = this.adapterObject.getAttribute('css') || '';
        };
      };
    });
    return this._cssObserver;
  }

  /**
   * Return a selector for the this element as a class chain.
   */
  get objectClassSelector(): string {
    return this.adapterObject.classList.value.replace(/ /g, ".");
  }
  
  initClass() {
    this._class = this.adapterObject.constructor as unknown as typeof Adapter;

    /**
     * If class tagName has been defined from somewhere else.
     * Then it shouldn't be initialized again.
     */
    if (this._class.adapter.tagName) {
      return;
    }
    this._class.adapter.tagName = this.adapterObject.tagName;
    this._class.adapter.initStyle();
  }

  /** Enable or disable CSS Observation */
  cssObserve(enable: boolean) {
    if (enable) {
      this.cssObserver.observe(this.adapterObject, { attributes: true });
    } else {
      this.cssObserver.disconnect();
    }
  }
}

type Constructor<T = {}> = new (...args: any[]) => T;

export function AdapterMixin<TBase extends Constructor<_HTMLElement>>(
  Base: TBase
) {
  return class Adapter extends Base {
    static _adapter: AdapterClass;

    static get adapter(): AdapterClass {
      if (this._adapter === Object.getPrototypeOf(this)._adapter) {
        this._adapter = new AdapterClass();
        this._adapter.adapterClass = this;
      }
      return this._adapter;
    }

    /** CSS Process middleware, This function will be called
     * before applying CSS to CSSStyleSheet.
     */
    static cssProcess(css: string): string {
      return css;
    }

    static set css(css: string) {
      this.adapter.css = css;
    }

    static get css(): string {
      return this.adapter.css;
    }

    static get tagName(): string | undefined {
      return this.adapter.tagName;
    }

    /** Add style to this component */
    static addStyle(css: string) {
      this.adapter.addStyle(css);
    }

    /**
     * Define component to element tag and init component style.
     * To extends this function, sub-elements must be defined
     * before call this function as `super.define(tagName);`
     */
    static define(tagName: string): void {
      this.adapter.define(tagName);
    }

    _class!: typeof Adapter; // instance's class for using as shortcut

    adapter: AdapterObject = new AdapterObject();

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
      this.adapter.adapterObject = this;
      if (!this.adapter._class) { this.adapter.initClass() };
      this.adapter.cssObserve(true);
    }

    initClass() {
      this._class = this.constructor as unknown as typeof Adapter;

      /**
       * If class tagName has been defined from somewhere else.
       * Then it shouldn't be initialized again.
       */
      if (this._class.adapter.tagName) {
        return;
      }
      this._class.adapter.tagName = this.tagName;
      this._class.adapter.initStyle();
    }

    /**
     * Set CSS for this element.
     * It works like `<el style="">` but with CSS processor.
     */
    set css(css: string) {
      this.adapter.styles = [css];
      this.classList.add(this.adapter.uuid);

      /** Init cssStyleSheet if it hasn't been inited yet.
       * This will make `this.objectClassSelector` works as expeced.
       */
      const processedCss = this.adapter._class.cssProcess(
        `${this.tagName}.${this.adapter.objectClassSelector} { ${css} }`
      );

      this.adapter.cssStyleSheet.replaceSync(processedCss);
    }

    /** Get CSS for this element */
    get css(): string {
      let css = this.getAttribute("css") || "";
      if (css) { return css };
      for (const rule of this.adapter.cssStyleSheet.cssRules) {
        css += rule.cssText + "\n";
      }
      return css;
    }

    connectedCallback(): void {
      super.connectedCallback ? super.connectedCallback() : null;

      /** Apply css if it's set in attributes */
      const css = this.getAttribute('css');
      if (css) { this.css = css };

      const rootNode = this.getRootNode() as Document | ShadowRoot;
      if (rootNode.adoptedStyleSheets.indexOf(
        this.adapter._class.adapter.cssStyleSheet) === -1) 
      {
        rootNode.adoptedStyleSheets.push(
          this.adapter._class.adapter.cssStyleSheet);
      }
      if (rootNode.adoptedStyleSheets.indexOf(
        this.adapter.cssStyleSheet) === -1)
      {
        rootNode.adoptedStyleSheets.push(
          this.adapter.cssStyleSheet);
      }
    }

    /** Add style for this element */
    addStyle(css: string): void {
      this.adapter.styles.push(css);
      this.classList.add(this.adapter.uuid);

      const processedCss = this.adapter._class.cssProcess(
        `${this.tagName}.${this.adapter.objectClassSelector} { ${css} }`
      );

      this.adapter.cssStyleSheet.insertRule(
        processedCss,
        this.adapter.cssStyleSheet.cssRules.length
      );
    }

    /** Remove the element from DOM and remove adoptedStyleSheet */
    remove() {
      const rootNode = this.getRootNode() as Document | ShadowRoot;
      const i = rootNode.adoptedStyleSheets.indexOf(this.adapter.cssStyleSheet);
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
