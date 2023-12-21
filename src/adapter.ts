import { uuid } from './util.js';


type Constructor<T = {}> = new (...args: any[]) => T;

function AdapterMixin<TBase extends Constructor<HTMLElement>>(Base: TBase) {
    return class Adapter extends Base {
        /** Styles which contain only css for this component */
        static _styles: Array<string> = [];

        /**
         * Retreive styles for this component,
         * also prevent inherit values from super class.
         */
        static get styles(): Array<string> {
            if (this._styles === Object.getPrototypeOf(this).styles) {
                this._styles = [];
            }
            return this._styles;
        }

        /** Retreive inherited styles for all super classes. */
        static get inheritedStyles(): Array<string> {
            let superClass = Object.getPrototypeOf(this);
            let inheritedStyles: Array<string> = [];
            while (superClass.styles !== undefined) {
                inheritedStyles.push(...superClass.styles);
                superClass = Object.getPrototypeOf(superClass);
            }
            return inheritedStyles;
        }

        /** Set CSS for this component */
        static set css(css: string) {
            this._styles = [css];
            this.cssStyleSheet.replaceSync(`${this.tagName} {${this.css}`);
        }

        /** Get CSS for this component, includes inherited styles */
        static get css(): string {
            let css: string = '';
            let styles = [...this.inheritedStyles, ...this.styles];
            for (const style of styles) {
                css += `\n${style}`;
            };
            return css;
        };

        /** Tag name of this component */
        static _tagName: string|null;
        static get tagName(): string|null {
            if (this._tagName === Object.getPrototypeOf(this).tagName) {
                this._tagName = null;
            }
            return this._tagName;
        }

        /** CSSStyleSheet() for this component */
        static _cssStyleSheet: CSSStyleSheet;
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
                css = `${this.tagName} { ${css} }`;
                this.cssStyleSheet.insertRule(css,
                    this.cssStyleSheet.cssRules.length);
            };
        };
        
        /**
         * Define component to element tag and init component style.
         * To extends this function, sub-elements must be defined
         * before call this function as `super.define(tagName);`
        */
        static define(tagName: string): void {
            this._tagName = tagName;
            customElements.define(tagName, this);
            this.initStyle();
        };

        /** Init component style */
        static initStyle() {
            this.cssStyleSheet.replaceSync(`${this.tagName} {${this.css}`);
            document.adoptedStyleSheets.push(this.cssStyleSheet);
        }

        /** Deprecated, will be removed in v3 */
        static tagStyle(css: string): void {
            this.addStyle(css);
        };

        /** Deprecated, will be removed in v3 */
        static classStyle(class_: string, css: string) {
            this.addStyle(`&.${class_} { ${css} }`);
        };

        _class?: typeof Adapter; // instance class.
        _cssStyleSheet?: CSSStyleSheet;
        adoptedStyleSheetIndex!: number;
        _uuid?: string; // instance id.
        _css: string = '';
        
        /**
         * In constructor, there any some if condition to check
         * if it has been inited or not to prevent recursive call in Mixin
         */
        constructor(...args: any[]) {
            super(...args);
            if (this._class) { return };
            this._class = this.constructor as unknown as typeof Adapter;

            /**
             * If class tagName has been defined from somewhere else.
             * Then it shouldn't be initialized again.
            */
            if (this._class.tagName) { return };
            this._class._styles = [];
            this._class._tagName = this.tagName;
            this._class.initStyle();
        };

        /** Dynamically create and return uuid for the element */
        get uuid(): string {
            if (!this._uuid) {
                this._uuid = `${this.tagName}-${uuid()}`;
            }
            return this._uuid;
        }

        /**
         * Dynamically create a CSSStyleSheet() and keep track of the adopted
         * stylesheet index for later reference.
         */
        get cssStyleSheet() {
            if (!this._cssStyleSheet) {
                const index = document.adoptedStyleSheets.length;
                this.classList.add(this.uuid);
                this._cssStyleSheet = new CSSStyleSheet();
                document.adoptedStyleSheets[index] = this._cssStyleSheet;
                this.adoptedStyleSheetIndex = index;
            }
            return this._cssStyleSheet;
        }

        /**
         * Return a selector for the this element as a class chain.
         */
        get objectClassSelector(): string {
            return '&.' + this.classList.value.replace(/ /g, '.');
        }

        /**
         * Set CSS for this element.
         * It works like `<el style="">` with nest syntax.
         */
        set css(css: string) {
            this._css = css;
            this.cssStyleSheet.replaceSync(`
                ${this.tagName} {
                    ${this.objectClassSelector} { ${css} }
                }`
            );
        }

        /** Add style for this element */
        addStyle(css: string): void {
            this.cssStyleSheet.insertRule(`
                ${this.tagName} {
                    ${this.objectClassSelector} { ${css} }
                }`,
                this.cssStyleSheet.cssRules.length
            );
        };

        /** Remove the element from DOM and remove adoptedStyleSheet */
        delete() {
            document.adoptedStyleSheets.splice(
                this.adoptedStyleSheetIndex, 1);
            this.remove();
        }
    };
}

const Adapter = AdapterMixin(HTMLElement);

export { Adapter, AdapterMixin };