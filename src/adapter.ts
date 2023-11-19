import { addStyle } from './style.js';


interface Style {
    class_: string;
    css: string;
}

class Adapter extends HTMLElement {
    static tagName: string;
    static styles: Array<Style> = [];
    static _is_styled: boolean = false;
    
    static define(tagName: string): void {
        // To extends this function, sub-elements must be defined before call
        // this function as `super.define(tagName);`
        try {
            customElements.define(tagName, this);
        } catch (error) {
            if (error instanceof DOMException) {
                console.error(
                    `DOMException: '${this.name}' ` +
                    `has already been defined to tag '${this.tagName}'\n` +
                    `${error.stack}`
                );
                return;
            }
        }
        this.tagName = tagName;
        this.defineStyle();
    };

    static defineStyle(): void {
        addStyle(`${this.tagName} { all: unset; }`);

        const styles = [
            ...Object.getPrototypeOf(this).styles,
            ...this.styles
        ];

        for (const style of styles) {
            let selector = this.tagName;
            console.log(this.tagName);
            if (style['class_'] !== '') {
                selector = `${this.tagName}.${style['class_']}`
            }
            addStyle(`${selector} { ${style.css} }`);
        }
    };

    static tagStyle(css: string): void {
        // In case that component has been defined,
        // put css directly into html.
        if (this.tagName) {
            addStyle(`${this.tagName} { ${css} }`);
        }
        this.styles = this.styles.concat({class_: '', css: css});
    }

    static classStyle(class_: string, css: string) {
        // In case that component has been defined,
        // put css directly into html.
        if (this.tagName) {
            addStyle(`${this.tagName}.${class_} { ${css} }`);
        }
        this.styles = this.styles.concat({class_: class_, css: css});
    }

    static readonly max_id = Math.pow(16, 4) - 1;
    static ids = {};
    static _generate_id() {
        return `adt-${Math.floor(Math.random() * this.max_id).toString(16)}`;
    }

    _class: any | Adapter; // store class to access static props.
    _id: string; // instance id.
    
    constructor() {
        super();
        this._class = this.constructor;
        let id = this._class._generate_id();
        let gen_times = 0;
        while (this._class.ids[id] === true) {
            if (gen_times >= 10) {
                console.error(`There are too many ${this._class} instances`)
                return;
            }
            id = this._class._generate_id();
            gen_times++;
        }
        this._class.ids[id] = true;
        this._id = id;
    }

    addStyle(style: string): void {
        this.classList.add(this._id);
        let selector = this.classList.value.replace(/ /g, '.');
        addStyle(`${this.tagName}.${selector} { ${style} }`);
    }
}

export { Adapter };