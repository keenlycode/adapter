import { _addStyle } from './style.js';


interface Style {
    class_: string;
    css: string;
}


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
        static tagName: string;
        static styles: Array<Style> = [];
        static _is_styled: boolean = false;

        static addStyle(css: string) {
            const styleNode = document.createElement('style');
            styleNode.setAttribute('component', this.name);
            _addStyle(styleNode, css, document.head);
        }
        
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
                }
            }
            this.tagName = tagName;
            this.defineStyle();
        };

        static defineStyle(): void {
            let css = `${this.tagName} { all: unset }`;

            const styles = [
                ...Object.getPrototypeOf(this).styles,
                ...this.styles
            ];

            for (const style of styles) {
                let selector = this.tagName;
                if (style['class_'] !== '') {
                    selector = `${this.tagName}.${style['class_']}`
                }
                css += `\n${selector} { ${style.css} }`;
            }

            this.addStyle(css);
        };

        static tagStyle(css: string): void {
            // In case that component has been defined,
            // put css directly into html.
            if (this.tagName) {
                this.addStyle(`\n${this.tagName} { ${css} }`);
            }
            this.styles = this.styles.concat({class_: '', css: css});
        }

        static classStyle(class_: string, css: string) {
            // In case that component has been defined,
            // put css directly into html.
            if (this.tagName) {
                this.addStyle(`\n${this.tagName}.${class_} { ${css} }`);
            }
            this.styles = this.styles.concat({class_: class_, css: css});
        }

        static readonly max_id = Math.pow(16, 4) - 1;
        static ids: {[index: string]: any} = {};
        static idsCount = 0;
        static _generate_id() {
            if (this.idsCount > 10000) {
                throw new Error(
                    `${this} instance exceed 10,000. Too many instances.`
                );
            }
            let id: string = '';
            let gen_times = 0;
            while (this.ids[id] === true) {
                id = `${this.name}-${Math.floor(Math.random() * this.max_id).toString(16)}`;
                gen_times++;
            }
            this.ids[id] = true;
            this.idsCount++;
            return id;
        }

        _class: any | Constructor<HTMLElement>; // store class to access static props.
        _id: string; // instance id.
        
        constructor(...args: any[]) {
            super();
            this._class = this.constructor;
            this._id = this._class._generate_id();
        }

        addStyle(style: string): void {
            this.classList.add(this._id);
            let selector = this.classList.value.replace(/ /g, '.');
            const styleNode = document.createElement('style');
            _addStyle(styleNode, `${this.tagName}.${selector} { ${style} }`, this);
        }
    };
}

const Adapter = AdapterMixin(HTMLElement);

export { Adapter, AdapterMixin, DOMError };