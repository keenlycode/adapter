import { uuid } from './util.js';
import { stylis } from './cssProcessor/stylis.bundle.js';

type Constructor<T = {}> = new (...args: any[]) => T;

export function AdapterMixin<TBase extends Constructor<HTMLElement>>(
  Base: TBase
) {
  return class Adapter extends Base {
    /** CSSStyleSheet() for this component */
    static _cssStyleSheet: CSSStyleSheet;

    /** Tag name of this component */
    static _tagName: string | null;

    /** Styles which contain only css for this component */
    static _styles: string[] = [];

    /** CSS Process middleware, This function will be called
     * before applying CSS to CSSStyleSheet.
     */
    static cssProcess(css: string): string {
      return css;
    }

    /**
     * Retreive styles for this component,
     * also prevent inherit values from super class.
     */
    static get styles(): string[] {
      if (this._styles === Object.getPrototypeOf(this).styles) {
        this._styles = [];
      }
      return this._styles;
    }

    /** Retreive inherited styles for all super classes. */
    static get allStyles(): string[] {
      let superClass = Object.getPrototypeOf(this);
      const allStyles = [];

      while (superClass.styles !== undefined) {
        allStyles.push(...superClass.styles);
        superClass = Object.getPrototypeOf(superClass);
      }
      allStyles.push(this.styles);
      return allStyles;
    }

    /** Set CSS for this component */
    static set css(css: string) {
      this._styles = [css];

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

    static get allCSS(): string {
      return this.allStyles.join("\n");
    }

    /** Get tagName for this class which will be defined after
     * the class has been registerd with CustomElementsRegistry.
     */
    static get tagName(): string | null {
      if (this._tagName === Object.getPrototypeOf(this).tagName) {
        this._tagName = null;
      }
      return this._tagName;
    }

    /** Get CSSStyleSheet() for this component.
     * Create a new one if haven't been created yet.
     */
    static get cssStyleSheet(): CSSStyleSheet {
      const superCSSStyleSheet = Object.getPrototypeOf(this)._cssStyleSheet;
      if (this._cssStyleSheet === superCSSStyleSheet) {
        this._cssStyleSheet = new CSSStyleSheet();
      }
      return this._cssStyleSheet;
    }

    /** Add style to this component */
    static addStyle(css: string) {
      this._styles = this._styles.concat(css);

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
      this._tagName = tagName;
      customElements.define(tagName, this);
      this.initStyle();
    }

    /** Init component style */
    static initStyle() {
      this.cssStyleSheet.replaceSync(
        this.cssProcess(`${this.tagName} { ${this.css} }`)
      );
      document.adoptedStyleSheets.push(this.cssStyleSheet);
    }

    /** Deprecated, will be removed in v3 */
    static tagStyle(css: string): void {
      console.warn('tagStyle() is deprecated, use addStyle() instead');
      this.addStyle(css);
    }

    /** Deprecated, will be removed in v3 */
    static classStyle(class_: string, css: string) {
      console.warn('classStyle() is deprecated, use addStyle() instead');
      this.addStyle(`&.${class_} { ${css} }`);
    }

    _class!: typeof Adapter; // instance's class for using as shortcut

    _cssStyleSheet?: CSSStyleSheet;

    // index of this.cssStyleSheet in document.adoptedStyleSheets
    adoptedStyleSheetIndex!: number;

    _uuid?: string;

    _shadowRoot!: ShadowRoot|null;

    /**
     * In constructor, there any some if condition to check
     * if it has been inited or not to prevent recursive call in Mixin
     */
    constructor(...args: any[]) {
      super(...args);
      if (this._class) {
        return;
      }
      this._class = this.constructor as unknown as typeof Adapter;

      /**
       * If class tagName has been defined from somewhere else.
       * Then it shouldn't be initialized again.
       */
      if (this._class.tagName) {
        return;
      }
      this._class._styles = [];
      this._class._tagName = this.tagName;
      this._class.initStyle();
    }

    /** Dynamically create and return uuid for the element */
    get uuid(): string {
      if (!this._uuid) {
        this._uuid = `${this.tagName}-${uuid()}`;
      }
      return this._uuid;
    }

    /**
     * Dynamically create a CSSStyleSheet() and keep track of the adopted
     * stylesheet index for reference.
     */
    get cssStyleSheet() {
      if (this._cssStyleSheet) { return this._cssStyleSheet };

      this._cssStyleSheet = new CSSStyleSheet();

      /** For normal element, attach this._cssStyleSheet to the document */
      if (!this._shadowRoot) {
        const index = document.adoptedStyleSheets.length;
        this.classList.add(this.uuid);
        document.adoptedStyleSheets[index] = this._cssStyleSheet;
        this.adoptedStyleSheetIndex = index;
      }

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
      // Init cssStyleSheet if it hasn't been inited yet.
      this.cssStyleSheet;

      const processedCss = this._class.cssProcess(
        `${this.tagName}.${this.objectClassSelector} { ${css} }`
      );
      
      this.cssStyleSheet.replaceSync(processedCss);
    }

    /** Get CSS for this element */
    get css(): string {
      let css = ``;
      for (const rule of this.cssStyleSheet.cssRules) {
        css += rule.cssText + "\n";
      }
      return css;
    }

    /** Override super.attachShadow()
     * to add this.cssStyleSheet to shadowRoot
     */
    attachShadow(init: ShadowRootInit): ShadowRoot {
      const shadowRoot = super.attachShadow(init);
      shadowRoot.adoptedStyleSheets = [
        this._class.cssStyleSheet,
        this.cssStyleSheet
      ];
      document.adoptedStyleSheets.splice(this.adoptedStyleSheetIndex, 1);
      this._shadowRoot = shadowRoot;
      return shadowRoot;
    }

    /** Add style for this element */
    addStyle(css: string): void {
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
    delete() {
      if (!this._shadowRoot) {
        document.adoptedStyleSheets.splice(this.adoptedStyleSheetIndex, 1)
      };
      this.remove();
    }
  };
}

export class Adapter extends AdapterMixin(HTMLElement) {
  static cssProcess(css: string): string {
    return stylis(css);
  }
}
