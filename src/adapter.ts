import { css, cx } from "@emotion/css";
import { addStyle } from "./add-style";

export const define = (tagName: string, Class: any = Adapter) => {
    // Order of this function belows are very crucial.
    // Class state must be defined before `customElements.define`
    Class.tagName = tagName;
    Class.define(tagName);
    Class.initStyle();
}

export class StyleClass {
    static readonly default: object;
    static css(style: any = {}): string { return '' };
    static style(style: any = {}): string { return '' };
}

export class Adapter extends HTMLElement {
    static Style = StyleClass;
    static tagName: string;
    
    static define(tagName: string): void {
        // To extends this function, sub-elements must be defined before call
        // this function as `super.onDefine(tagName);`
        customElements.define(tagName, this);
    };

    static initStyle(style?: any): void {
        if (!this.Style) {return};
        addStyle`
        ${this.tagName} {
            ${this.Style.css(style)}
        }`;
    };

    static tagStyle(style?: string|Object): void {
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

    static classStyle(class_: string, style?: string|Object): void {
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

    styleClass: string; // store style class name;
    _class: any | Adapter; // store class to access static props.
    
    constructor() {
        super();
        this._class = this.constructor;
    }

    addStyle(style?: any): void {
        let className;
        if (typeof style == 'string') {
            className = css`${style}`;
        } else if (typeof style == "object") {
            className = css`${this._class.Style.style(style)}`;
        };
        className = cx(...this.classList, className);
        this.className = className;
    }

    notify(name: string, options: object) {
        const event = new CustomEvent(name, options);
        this.dispatchEvent(event);
    }
}