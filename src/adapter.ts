class DOMError extends Error {
    constructor(message: string) {
        super();
        this.message = message;
        this.name = 'DOMError';
    }
}

type Constructor<T = {}> = new (...args: any[]) => T;

function AdapterMixin<TBase extends Constructor<HTMLElement>>(Base: TBase) {
    return class extends Base {
        /** _styles which contain only css for this component */
        static _styles: Array<string> = [];

        static get styles(): Array<string> {
            const superClass = Object.getPrototypeOf(this);
            let styles = this._styles;
            if (superClass.styles instanceof Array) {
                styles = [...superClass.styles, ...styles];
            };
            return styles;
        }

        static set style(css: string) {
            this._styles = [css];
        }

        static get css(): string {
            let css: string = `${this.tagName} { all: unset }`;

            for (const style of this.styles) {
                css += `\n${this.tagName} { ${style} }`;
            };

            return css;
        };

        static _tagName: string;
        static get tagName(): string|undefined {
            if (this._tagName === Object.getPrototypeOf(this).tagName) {
                return undefined;
            }
            return this._tagName;
        }

        static _cssStyleSheet: CSSStyleSheet;
        static get cssStyleSheet(): CSSStyleSheet {
            const superCSSStyleSheet = Object.getPrototypeOf(this)._cssStyleSheet;

            if ((this._cssStyleSheet === undefined) ||
                    (this._cssStyleSheet === superCSSStyleSheet)){
                this._cssStyleSheet = new CSSStyleSheet();
            }

            return this._cssStyleSheet;
        }

        static addStyle(css: string) {
            this._styles = this._styles.concat(css);

            if (this.tagName) {
                const addIndex = this.cssStyleSheet.cssRules.length;
                css = `${this.tagName} { ${css} }`;
                this.cssStyleSheet.insertRule(css, addIndex);
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
            this.cssStyleSheet.replaceSync(this.css);
            document.adoptedStyleSheets.push(this.cssStyleSheet);
        };

        /** Deprecated, will be removed in 3.x */
        static tagStyle(css: string): void {
            this.addStyle(css);
        };

        /** Deprecated, will be removed in 3.x */
        static classStyle(class_: string, css: string) {
            this.addStyle(`&.${class_} { ${css} }`);
        };

        static readonly max_id = Math.pow(16, 4) - 1;
        static ids: {[index: string]: any} = {};
        static idsCount = 0;
        static _generate_id() {
            const _gen_id = () => {
                return `${this.name}-${Math.floor(Math.random() * this.max_id).toString(16)}`;
            }

            if (this.idsCount > 10000) {
                throw new Error(
                    `${this} instance exceed 10,000. Too many instances.`
                );
            };
            let id: string = _gen_id();
            while (id in this.ids) {
                id = _gen_id();
            };
            this.ids[id] = true;
            this.idsCount++;
            return id;
        };

        _class: any | Constructor<HTMLElement>; // store class to access static props.
        _id: string; // instance id.
        
        constructor(...args: any[]) {
            super(...args);
            this._class = this.constructor;
            this._id = this._class._generate_id();
        };

        addStyle(css: string): void {
            this.classList.add(this._id);
            let class_ = this.classList.value.replace(/ /g, '.');
            css = `&.${class_} { ${css} }`;
            this._class.addStyle(css);
        };
    };
}

const Adapter = AdapterMixin(HTMLElement);

export { Adapter, AdapterMixin, DOMError };