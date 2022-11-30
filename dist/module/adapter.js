import {css as $4rsxT$css, cx as $4rsxT$cx, injectGlobal as $9398040b4c1fbe65$re_export$addStyle} from "@emotion/css";





const $050c63195fe7ace5$export$f36d6a7a5c09a23e = (tagName, Class = $050c63195fe7ace5$export$906fdd6a257127ec)=>{
    // Order of this function belows are very crucial.
    // Class state must be defined before `customElements.define`
    Class.tagName = tagName;
    Class.define(tagName);
    Class.initStyle();
};
class $050c63195fe7ace5$export$e99fb5d841f44f27 {
    static css(style = {}) {
        return "";
    }
    static style(style = {}) {
        return "";
    }
}
class $050c63195fe7ace5$export$906fdd6a257127ec extends HTMLElement {
    static Style = $050c63195fe7ace5$export$e99fb5d841f44f27;
    static define(tagName) {
        // To extends this function, sub-elements must be defined before call
        // this function as `super.onDefine(tagName);`
        customElements.define(tagName, this);
    }
    static initStyle(style) {
        if (!this.Style) return;
        (0, $9398040b4c1fbe65$re_export$addStyle)`
        ${this.tagName} {
            ${this.Style.css(style)}
        }`;
    }
    static tagStyle(style) {
        if (typeof style == "string") {
            (0, $9398040b4c1fbe65$re_export$addStyle)`
            ${this.tagName} {
                ${style}
            }`;
            return;
        }
        (0, $9398040b4c1fbe65$re_export$addStyle)`
        ${this.tagName} {
            ${this.Style.style(style)}
        }`;
    }
    static classStyle(class_, style) {
        if (typeof style == "string") (0, $9398040b4c1fbe65$re_export$addStyle)`
            ${this.tagName}.${class_} {
                ${style}
            }`;
        else if (typeof style == "object") (0, $9398040b4c1fbe65$re_export$addStyle)`
            ${this.tagName}.${class_} {
                ${this.Style.style(style)}
            }`;
    }
    constructor(){
        super();
        this._class = this.constructor;
    }
    addStyle(style) {
        let className;
        if (typeof style == "string") className = (0, $4rsxT$css)`${style}`;
        else if (typeof style == "object") className = (0, $4rsxT$css)`${this._class.Style.style(style)}`;
        className = (0, $4rsxT$cx)(...this.classList, className);
        this.className = className;
    }
    notify(name, options) {
        const event = new CustomEvent(name, options);
        this.dispatchEvent(event);
    }
}


export {$050c63195fe7ace5$export$f36d6a7a5c09a23e as define, $050c63195fe7ace5$export$906fdd6a257127ec as Adapter, $050c63195fe7ace5$export$e99fb5d841f44f27 as StyleClass, $9398040b4c1fbe65$re_export$addStyle as addStyle};
//# sourceMappingURL=adapter.js.map
