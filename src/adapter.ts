import { 
    injectGlobal as addStyle,
    css,
    cx } from "@emotion/css";

export { addStyle };

const IDmax = Math.pow(16,4) - 1;

export const define = (tagName: string, Class: any = Adapter) => {
    Class.define(tagName);
}

export class StyleClass {
    static readonly default: object;
    static css(style: Object = {}): string { return '' };
    static style(style: Object = {}): string { return '' };
}

export class Adapter extends HTMLElement {
    static Style = StyleClass;
    static _tagName: string;

    static get tagName() {
        if (!this._tagName) {
            throw `${this.name} hasn't been defined a tag name`;
        }
        return this._tagName;
    }

    static set tagName(tagName) {
        this._tagName = tagName;
    }
    
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
        this.initStyle();
    };

    static initStyle(style?: string | Object): void {
        addStyle`
        ${this.tagName} {
            all: unset;
        }`;

        if (typeof style == "string") {
            addStyle`
            ${this.tagName} {
                ${style}
            }`;
            return;
        }

        if (!this.Style) {return};
        addStyle`
        ${this.tagName} {
            ${this.Style.css(style)}
        }`;
    };

    static tagStyle(style: string | Object): void {
        if (typeof style == "string") {
            addStyle`
            ${this.tagName} {
                ${style}
            }`;
            return;
        }

        addStyle`
        ${this.tagName} {
            ${this.Style.style(style)}
        }`;
    }

    static classStyle(class_: string, style: string | Object): void {
        if (typeof style == "string") {
            addStyle`
            ${this.tagName}.${class_} {
                ${style}
            }`;
        } else if (typeof style == "object") {
            addStyle`
            ${this.tagName}.${class_} {
                ${this.Style.style(style)}
            }`;
        };
    }

    _class: any | Adapter; // store class to access static props.
    _id: string;
    
    constructor() {
        super();
        this._class = this.constructor;
    }

    addStyle(style: string | Object): void {
        // let className;
        // if (typeof style == 'string') {
        //     className = css`${style}`;
        // } else if (typeof style == "object") {
        //     className = css`${this._class.Style.style(style)}`;
        // };
        // className = cx(...this.classList, className);
        // this.className = className;
        if (!this._id) {
            this._id = `adt-${Math.floor(Math.random() * IDmax).toString(16)}`;
            this.classList.add(this._id);
        }
        let selector = this.classList.value.replace(/ /g, '.');
        if (typeof style == "string") {
            addStyle`
            ${this.tagName}.${selector} {
                ${style}
            }`;
        };
    }

    notify(name: string, options: object) {
        const event = new CustomEvent(name, options);
        this.dispatchEvent(event);
    }
}