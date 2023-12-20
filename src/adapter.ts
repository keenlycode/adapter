import { uuid } from './util';

class DOMError extends Error {
    constructor(message: string) {
        super();
        this.message = message;
        this.name = 'DOMError';
    }
}

type Constructor<T = {}> = new (...args: any[]) => T;

function AdapterMixin<TBase extends Constructor<HTMLElement>>(Base: TBase) {
    return class Adapter extends Base {
        /** _styles which contain only css for this component */
        static _styles: Array<string> = [];

        /** Retreive styles for this class,
         * it prevent inherit values from super class.
         */
        static get styles(): Array<string> {
            if (this._styles === Object.getPrototypeOf(this).styles) {
                this._styles = [];
            }
            return this._styles;
        }

        /** Retreive inherited styles for all super classes.
         */
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

        static addStyle(css: string) {
            this._styles = this._styles.concat(css);
            if (this.tagName) {
                css = `${this.tagName} { ${css} }`;
                this.cssStyleSheet.insertRule(css,
                    this.cssStyleSheet.cssRules.length);
            };
        };
        
        static define(tagName: string): void {
            // To extends this function, sub-elements must be defined before call
            // this function as `super.define(tagName);`
            try {
                customElements.define(tagName, this);
            } catch (error) {
                if (error instanceof DOMException) {
                    throw new DOMError(
                        `DOMException: '${this.name}' ` +
                        `has already been defined to tag '${this.tagName}'`
                    );
                };
            };
            this._tagName = tagName;
            this.initStyle();
        };

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

        _uuid!: string; // instance id.
        _class: typeof Adapter;
        _cssStyleSheet!: CSSStyleSheet;
        adoptedStyleSheetIndex: number|null = null;

        get uuid(): string {
            if (!this._uuid) {
                this._uuid = `${this.tagName}-${uuid()}`;
            }
            return this._uuid;
        }

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

        get objectClassSelector(): string {
            return '&.' + this.classList.value.replace(/ /g, '.');
        }

        set css(css: string) {
            this.cssStyleSheet.replaceSync(`
                ${this.tagName} {
                    ${this.objectClassSelector} { ${css} }
                }`
            );
        }
        
        /** In constructor, there any some if condition to check
         * if it has been init or not, because in Mixin,
         * super will recursively call super class constructor or method.
         */
        constructor(...args: any[]) {
            super(...args);
            if (this._class) { return };
            this._class = this.constructor as unknown as typeof Adapter;

            /** If class tagName has been defined from somewhere else.
             * Then it shouldn't be initialized again.
            */
            if (this._class.tagName) { return };
            // this._class._styles = [];
            this._class._tagName = this.tagName;
            this._class.initStyle();
        };

        addStyle(css: string): void {
            this.cssStyleSheet.insertRule(`
                ${this.tagName} {
                    ${this.objectClassSelector} { ${css} }
                }`,
                this.cssStyleSheet.cssRules.length
            );
        };

        delete() {
            delete document.adoptedStyleSheets[this.adoptedStyleSheetIndex!];
            this.remove();
        }
    };
}

const Adapter = AdapterMixin(HTMLElement);

export { Adapter, AdapterMixin, DOMError };