import { uuid } from './util.ts';
import type { HTMLElementInterface } from "./util.ts";
import { css } from './css.ts';

/**
 * Controller for Adapter class-level behavior (registration and shared CSS).
 *
 * Notes
 * -----
 * One controller instance is associated with each Adapter subclass and is
 * responsible for:
 *
 * - Defining the custom element tag.
 * - Managing a constructable CSSStyleSheet shared by all instances.
 * - Aggregating CSS from the class and its superclasses.
 */
class AdapterClassController {

  /**
   * Reference to the Adapter constructor that owns this controller.
   *
   * Notes
   * -----
   * Set internally by AdapterMixin when the subclass is first accessed.
   */
  adapterClass!: typeof Adapter;

  /**
   * Constructable stylesheet that holds class-level CSS rules.
   *
   * Notes
   * -----
   * Added to `document.adoptedStyleSheets` in `initStyle()`.
   */
  cssStyleSheet: CSSStyleSheet = new CSSStyleSheet();

  /**
   * Custom element tag name for this component (once defined).
   */
  tagName?: string;

  /**
   * CSS template tag processor used to transform CSS template literals.
   *
   * Notes
   * -----
   * Defaults to the `css` function imported from './css.ts'. This processor is
   * invoked when compiling class-level styles into the constructable
   * CSSStyleSheet. It may be replaced (for example in tests or subclasses) to
   * provide custom processing such as scoping, variable substitution, or
   * minification prior to writing rules into the stylesheet.
   */
  cssProcessor = css;

  /**
   * Accumulated CSS blocks without selectors.
   *
   * Notes
   * -----
   * - Preserves insertion order (via `addStyle()`).
   * - These snippets are wrapped with the component selector before being
   *   committed to `cssStyleSheet`.
   */
  private styles: string[] = [];

  /**
   * Concatenated class-level CSS.
   *
   * Returns
   * -------
   * string
   *     The joined stylesheet text for this class only (no superclasses).
   */
  get style(): string {
    return this.styles.join("\n");
  }

  /**
   * Replace existing class-level CSS and update the stylesheet.
   *
   * Parameters
   * ----------
   * style : string
   *     Entire CSS text to set for this class.
   */
  set style(style: string) {
    this.styles = [style];
    this.updateStyleSheet();
  }

  /**
   * Collect CSS from the inheritance chain.
   *
   * Returns
   * -------
   * string[]
   *     Array of CSS blocks from superclasses followed by this class.
   *
   * Notes
   * -----
   * Superclass styles are added first to preserve expected cascade order.
   */
  private get allStyles(): string[] {
    let superClass = Object.getPrototypeOf(this.adapterClass);
    const allStyles: string[] = [];

    while (superClass.adapter) {
      allStyles.push(...superClass.adapter.styles);
      superClass = Object.getPrototypeOf(superClass);
    }
    allStyles.push(...this.styles);
    return allStyles;
  }

  /**
   * Joined CSS string across the entire inheritance chain.
   *
   * Returns
   * -------
   * string
   *     Combined stylesheet text including superclasses and this class.
   */
  private get allStyle(): string {
    return this.allStyles.join("\n");
  }

  /**
   * Define the custom element and initialize its shared stylesheet.
   *
   * Parameters
   * ----------
   * tagName : string
   *     The custom element tag to register.
   *
   * Raises
   * ------
   * DOMException
   *     If the tag name is invalid or already defined.
   *
   * Examples
   * --------
   * ```ts
   * class Card extends Adapter {}
   * Card.define("el-card");
   * ```
   *
   * Notes
   * -----
   * When extending, call `super.define(tagName)` before subclass-specific work.
   */
  define(tagName: string): void {
    this.tagName = tagName;
    customElements.define(tagName, this.adapterClass);
    this.initStyle();
  }

  /**
   * Attach the shared stylesheet and synchronize its rules.
   *
   * Notes
   * -----
   * Pushes `cssStyleSheet` to `document.adoptedStyleSheets` and compiles the
   * current CSS into it.
   */
  initStyle() {
    document.adoptedStyleSheets.push(this.cssStyleSheet);
    this.updateStyleSheet();
  }

  /**
   * Append a CSS block to this class and update the stylesheet.
   *
   * Parameters
   * ----------
   * style : string
   *     CSS text without a selector (it will be wrapped automatically).
   */
  addStyle(style: string) {
    this.styles.push(style);
    this.updateStyleSheet();
  }

  /**
   * Compile and replace the constructable stylesheet with current rules.
   *
   * Notes
   * -----
   * No-op until `tagName` is set (i.e., after `define()`).
   */
  private updateStyleSheet() {
    if (!this.tagName) { return }
    const css = this.cssProcessor`${this.tagName} { ${this.allStyle} }`;
    this.cssStyleSheet.replaceSync(css);
  }
}

/**
 * Per-instance controller for Adapter elements (instance CSS and observation).
 *
 * Notes
 * -----
 * One controller instance is created for each Adapter element and is responsible for:
 *
 * - Managing an instance-scoped CSSStyleSheet for inline/attribute-driven styles.
 * - Generating and tracking a stable UUID used as a class-based selector hook.
 * - Observing the element's `css` attribute and syncing it to the instance stylesheet.
 * - Linking back to the owning Adapter class for shared processors and settings.
 *
 * This complements AdapterClassController, which manages class-level CSS and registration.
 */
class AdapterObjectController {

  /**
   * The owning Adapter element instance.
   *
   * Notes
   * -----
   * Set by the Adapter mixin constructor immediately after instantiation.
   */
  adapterObject!: Adapter;

  /**
   * Constructable stylesheet used for instance-scoped CSS rules.
   *
   * Notes
   * -----
   * Registered with the element's root node via adoptedStyleSheets when connected.
   */
  cssStyleSheet: CSSStyleSheet = new CSSStyleSheet();

  /**
   * Lazily generated UUID for the element.
   *
   * Notes
   * -----
   * - Used to create a unique class selector on the element.
   * - Stable for the lifetime of this controller once generated.
   */
  private _uuid?: string;

  /**
   * MutationObserver for tracking `css` attribute changes on the element.
   *
   * Notes
   * -----
   * Automatically updates `adapterObject.css` when the `css` attribute changes.
   */
  private _cssObserver!: MutationObserver;

  /**
   * Cached Adapter class (constructor) for the owning element.
   *
   * Notes
   * -----
   * Populated in `initClass()` and used to access class-level controller state.
   */
  _class!: typeof Adapter;

  /**
   * Unique identifier for this element used in generated selectors.
   *
   * Returns
   * -------
   * string
   *     The UUID in the form `${tagName}-${random}`.
   *
   * Notes
   * -----
   * Generated on first access and then cached.
   */
  get uuid(): string {
    if (this._uuid) { return this._uuid };
    this._uuid = `${this.adapterObject.tagName}-${uuid()}`;
    return this._uuid;
  }

  /**
   * A MutationObserver instance that mirrors `css` attribute changes to styles.
   *
   * Returns
   * -------
   * MutationObserver
   *     The observer configured to watch attribute mutations on the element.
   *
   * Notes
   * -----
   * Created lazily and reused for subsequent observations.
   */
  get cssObserver(): MutationObserver {
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
   * Selector for this element represented as a dot-joined class chain.
   *
   * Returns
   * -------
   * string
   *     The element's classList joined with '.' (e.g., "a.b.c").
   */
  get objectClassSelector(): string {
    return this.adapterObject.classList.value.replace(/ /g, ".");
  }

  /**
   * Initialize class-level links and ensure the class stylesheet is ready.
   *
   * Notes
   * -----
   * - Captures the Adapter constructor from the instance.
   * - If the class tagName is not set, initializes it and attaches the shared stylesheet.
   * - No-op if the class tagName is already defined.
   */
  initClass() {
    this._class = this.adapterObject.constructor as unknown as typeof Adapter;

    /**
     * If class tagName has been defined from somewhere else,
     * then it shouldn't be initialized again.
     */
    if (this._class.adapter.tagName) {
      return;
    }
    this._class.adapter.tagName = this.adapterObject.tagName;
    this._class.adapter.initStyle();
  }

  /**
   * Enable or disable observation of the element's `css` attribute.
   *
   * Parameters
   * ----------
   * enable : boolean
   *     True to start observing, false to disconnect.
   *
   * Notes
   * -----
   * Observation is limited to attribute mutations on the host element.
   */
  cssObserve(enable: boolean) {
    if (enable) {
      this.cssObserver.observe(this.adapterObject, { attributes: true });
    } else {
      this.cssObserver.disconnect();
    }
  }
}

type Constructor<T = {}> = new (...args: any[]) => T;

/**
 * A mixin function to add Adapter functionality to a base class.
 * @template TBase - The base class type.
 */
function AdapterMixin<TBase extends Constructor<HTMLElementInterface>>(
  Base: TBase
) {
  return class _Adapter extends Base {

    /** Static instance of AdapterClassController */
    static _adapter: AdapterClassController;

    /**
     * Get the AdapterClassController instance.
     */
    static get adapter(): AdapterClassController {
      if (this._adapter === Object.getPrototypeOf(this)._adapter) {
        this._adapter = new AdapterClassController();
        this._adapter.adapterClass = this;
      }
      return this._adapter;
    }

    /**
     * Set the CSS for the component.
     */
    static set css(css: string) {
      this.adapter.style = css;
    }

    /**
     * Get the CSS for the component.
     */
    static get css(): string {
      return this.adapter.style;
    }

    /**
     * Get the tag name of the component.
     */
    static get tagName(): string | undefined {
      return this.adapter.tagName;
    }

    /**
     * Add style to this component.
     */
    static addStyle(css: string) {
      this.adapter.addStyle(css);
    }

    /**
     * Define component to element tag and init component style.
     * To extend this function, sub-elements must be defined
     * before calling this function as `super.define(tagName);`
     */
    static define(tagName: string) {
      this.adapter.define(tagName);
    }

    /** Instance of AdapterObjectController */
    _adapter: AdapterObjectController = new AdapterObjectController();

    /**
     * Constructor to initialize the AdapterObjectController.
     */
    constructor(...args: any[]) {
      super(...args);
      this._adapter.adapterObject = this;
      if (!this._adapter._class) { this._adapter.initClass() };
      this._adapter.cssObserve(true);
    }

    /**
     * Set CSS for this element with tag name.
     */
    set css(css: string) {

      // Make sure classList contains object uuid
      this.classList.add(this._adapter.uuid);

      /** Init cssStyleSheet if it hasn't been inited yet.
       * This will make `this.objectClassSelector` work as expected.
       */
      const cssRule = `${this.tagName}.${this._adapter.objectClassSelector} { ${css} }`;
      this._adapter.cssStyleSheet.replaceSync(cssRule);
    }

    /**
     * Get CSS for this element.
     */
    get css(): string {
      let css = this.getAttribute("css") || "";
      if (css) { return css };
      for (const rule of this._adapter.cssStyleSheet.cssRules) {
        css += rule.cssText + "\n";
      }
      return css;
    }

    /**
     * Add style for this element.
     */
    addStyle(css: string): void {
      this.classList.add(this._adapter.uuid);

      const cssRule = `${this.tagName}.${this._adapter.objectClassSelector} { ${css} }`;
      this._adapter.cssStyleSheet.replaceSync(`
        ${this.css}
        ${cssRule}
      `);
    }

    /**
     * Register CSSStyleSheet() object to `rootNode.adoptedStyleSheets`.
     * This function will check the existing CSSStyleSheet() before applying
     * to make sure that it won't create duplicates.
     */
    _registCSSStyleSheet() {

      /** Apply css if it's set in attributes */
      const css = this.getAttribute('css');
      if (css) { this.css = css };

      const rootNode = this.getRootNode() as Document | ShadowRoot;
      if (rootNode.adoptedStyleSheets.indexOf(
        this._adapter._class.adapter.cssStyleSheet) === -1) {
        rootNode.adoptedStyleSheets.push(
          this._adapter._class.adapter.cssStyleSheet);
      }
      if (rootNode.adoptedStyleSheets.indexOf(
        this._adapter.cssStyleSheet) === -1) {
        rootNode.adoptedStyleSheets.push(
          this._adapter.cssStyleSheet);
      }
    }

    /** Callback when the element is connected to the DOM */
    override connectedCallback() {
      super.connectedCallback ? super.connectedCallback() : null;
      this._registCSSStyleSheet();
    }

    /** Remove the element from DOM and remove adoptedStyleSheet */
    override remove() {
      const rootNode = this.getRootNode() as Document | ShadowRoot;
      const i = rootNode.adoptedStyleSheets.indexOf(this._adapter.cssStyleSheet);
      rootNode.adoptedStyleSheets.splice(i, 1);
      super.remove();
    }
  };
}

class Adapter extends AdapterMixin(HTMLElement) { };

export { Adapter, AdapterMixin, css };
