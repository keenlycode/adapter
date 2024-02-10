import { uuid, HTMLElementInterface } from './util.js';
import { stylis } from './cssProcessor/stylis.bundle.js';
import { IsolatorMixin } from './isolator.js';


/**
 * AdapterClass manipulate `class Adapter`
 * and help to encapsulate private properties and methods.
 */
class AdapterClass {

  /** Reference to `class Adapter` */
  adapterClass!: typeof Adapter | any;

  cssStyleSheet: CSSStyleSheet = new CSSStyleSheet();

  /** Tag name of this component */
  tagName?: string;

  /** Style portions for this component
   * They are kept in array based on the order of adding by `addStyle()`,
   * ready to be defined in `cssStyleSheet` with components query selector.
   */
  styles: string[] = [];

  /** Retreive styles including styles from super class */
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

  /** Retreive CSS including all CSS super classes. */
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

  /** Get CSS defined by this component */
  get css(): string {
    return this.styles.join("\n");
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

  /** Add style to this component */
  addStyle(css: string) {
    this.styles.push(css);

    if (this.tagName) {
      const rule = `${this.tagName} { ${css} }`;
      const processedCss = this.adapterClass.cssProcess(rule);
      this.cssStyleSheet.replaceSync(`
        ${this.tagName} { ${this.allCSS} }
        ${processedCss}
      `);
    }
  }
}

class AdapterObject {

  /** Reference to Adapter() object */
  adapterObject!: Adapter | any;

  cssStyleSheet: CSSStyleSheet = new CSSStyleSheet();

  _uuid?: string;

  _cssObserver!: MutationObserver;

  _class!: typeof Adapter | any;

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

export function AdapterMixin<TBase extends Constructor<HTMLElementInterface>>(
  Base: TBase
) {
  return class _Adapter extends Base {
    
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
    static define(tagName: string) {
      this.adapter.define(tagName);
    }

    _adapter: AdapterObject = new AdapterObject();

    /**
     * In constructor, there any some if condition to check
     * if it has been inited or not to prevent recursive call in Mixin
     */
    constructor(...args: any[]) {
      super(...args);
      this._adapter.adapterObject = this;
      if (!this._adapter._class) { this._adapter.initClass() };
      this._adapter.cssObserve(true);
    }

    /**
     * Set CSS for this element.
     * It works like `<el style="">` but with CSS processor.
     */
    set css(css: string) {
      this.classList.add(this._adapter.uuid);

      /** Init cssStyleSheet if it hasn't been inited yet.
       * This will make `this.objectClassSelector` works as expeced.
       */
      const processedCss = this._adapter._class.cssProcess(
        `${this.tagName}.${this._adapter.objectClassSelector} { ${css} }`
      );

      this._adapter.cssStyleSheet.replaceSync(processedCss);
    }

    /** Get CSS for this element */
    get css(): string {
      let css = this.getAttribute("css") || "";
      if (css) { return css };
      for (const rule of this._adapter.cssStyleSheet.cssRules) {
        css += rule.cssText + "\n";
      }
      return css;
    }

    /** Add style for this element */
    addStyle(css: string): void {
      this.classList.add(this._adapter.uuid);

      const processedCss = this._adapter._class.cssProcess(
        `${this.tagName}.${this._adapter.objectClassSelector} { ${css} }`
      );

      this._adapter.cssStyleSheet.replaceSync(`
        ${this.css}
        ${processedCss}
      `);
    }

    connectedCallback() {
      super.connectedCallback ? super.connectedCallback() : null;

      /** Apply css if it's set in attributes */
      const css = this.getAttribute('css');
      if (css) { this.css = css };

      const rootNode = this.getRootNode() as Document | ShadowRoot;
      if (rootNode.adoptedStyleSheets.indexOf(
        this._adapter._class.adapter.cssStyleSheet) === -1) 
      {
        rootNode.adoptedStyleSheets.push(
          this._adapter._class.adapter.cssStyleSheet);
      }
      if (rootNode.adoptedStyleSheets.indexOf(
        this._adapter.cssStyleSheet) === -1)
      {
        rootNode.adoptedStyleSheets.push(
          this._adapter.cssStyleSheet);
      }
    }

    /** Remove the element from DOM and remove adoptedStyleSheet */
    remove() {
      const rootNode = this.getRootNode() as Document | ShadowRoot;
      const i = rootNode.adoptedStyleSheets.indexOf(this._adapter.cssStyleSheet);
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
