import { addStyle } from './style';

const define = (tagName: string, Class: any = Adapter) => {
    Class.define(tagName);
}

interface Style {
    class_: string;
    css: string;
}

class Adapter extends HTMLElement {
    static tagName: string;
    static styles: Array<Style> = [];
    
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
        addStyle`${this.tagName} { all: unset; }`;

        for (const style of this.styles) {
            let selector = this.tagName;
            if (style['class_'] !== '') {
                selector = `${this.tagName}.${style['class_']}`
            }
            addStyle`${selector} { ${style.css} }`;
        }
    };

    static style(css: string): void {
        if (this.tagName) {
            addStyle`${this.tagName} { ${css} }`;
            return;
        }
        this.styles.push({class_: '', css: css});
    }

    static classStyle(class_: string, css: string) {
        if (this.tagName) {
            addStyle`${this.tagName}.${class_} { ${css} }`;
            return;
        }
        this.styles.push({class_: class_, css: css});
    }

    static readonly max_id = Math.pow(16, 4) - 1;
    static instance = {};
    static _generate_id() {
        return `adt-${Math.floor(Math.random() * this.max_id).toString(16)}`;
    }

    _class: any | Adapter; // store class to access static props.
    _id: string; // instance id.
    
    constructor() {
        super();
        this._class = this.constructor;
        let id = this._class._generate_id();
        while (id in this._class.instance) {
            id = this._class._generate_id();
        }
        this._class.instance[id] = true;
        this._id = id;
    }

    addStyle(style: string): void {
        this.classList.add(this._id);
        let selector = this.classList.value.replace(/ /g, '.');
        addStyle`${this.tagName}.${selector} { ${style} }`;
    }

    notify(name: string, options?: object) {
        const event = new CustomEvent(name, options);
        this.dispatchEvent(event);
    }
}

export { define, Adapter };