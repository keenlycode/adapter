import {injectGlobal as $050c63195fe7ace5$import$45c2c5d8174c652c$efb9f5caaa2ca0c7} from "@emotion/css";


const $050c63195fe7ace5$export$f36d6a7a5c09a23e = (tagName, Class = $050c63195fe7ace5$export$906fdd6a257127ec)=>{
    Class.define(tagName);
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
    static get tagName() {
        if (!this._tagName) throw `${this.name} hasn't been defined a tag name`;
        return this._tagName;
    }
    static set tagName(tagName) {
        this._tagName = tagName;
    }
    static define(tagName) {
        // To extends this function, sub-elements must be defined before call
        // this function as `super.define(tagName);`
        try {
            customElements.define(tagName, this);
        } catch (error) {
            if (error instanceof DOMException) {
                console.error(`DOMException: '${this.name}' ` + `has already been defined to tag '${this.tagName}'\n` + `${error.stack}`);
                return;
            }
        }
        this.tagName = tagName;
        this.initStyle();
    }
    static initStyle() {
        (0, $050c63195fe7ace5$import$45c2c5d8174c652c$efb9f5caaa2ca0c7)`
        ${this.tagName} {
            all: unset;
        }`;
        if (!this.Style) return;
        (0, $050c63195fe7ace5$import$45c2c5d8174c652c$efb9f5caaa2ca0c7)`
        ${this.tagName} {
            ${this.Style.css()}
        }`;
    }
    static tagStyle(style) {
        if (typeof style == "string") {
            (0, $050c63195fe7ace5$import$45c2c5d8174c652c$efb9f5caaa2ca0c7)`
            ${this.tagName} {
                ${style}
            }`;
            return;
        }
        (0, $050c63195fe7ace5$import$45c2c5d8174c652c$efb9f5caaa2ca0c7)`
        ${this.tagName} {
            ${this.Style.style(style)}
        }`;
    }
    static classStyle(class_, style) {
        if (typeof style == "string") (0, $050c63195fe7ace5$import$45c2c5d8174c652c$efb9f5caaa2ca0c7)`
            ${this.tagName}.${class_} {
                ${style}
            }`;
        else if (typeof style == "object") (0, $050c63195fe7ace5$import$45c2c5d8174c652c$efb9f5caaa2ca0c7)`
            ${this.tagName}.${class_} {
                ${this.Style.style(style)}
            }`;
    }
    static max_id = Math.pow(16, 4) - 1;
    static instance = {};
    static _generate_id() {
        return `adt-${Math.floor(Math.random() * this.max_id).toString(16)}`;
    }
    constructor(){
        super();
        this._class = this.constructor;
        let id = this._class._generate_id();
        while(id in this._class.instance)id = this._class._generate_id();
        this._class.instance[id] = true;
        this._id = id;
    }
    addStyle(style) {
        this.classList.add(this._id);
        let selector = this.classList.value.replace(/ /g, ".");
        if (typeof style == "string") (0, $050c63195fe7ace5$import$45c2c5d8174c652c$efb9f5caaa2ca0c7)`
            ${this.tagName}.${selector} {
                ${style}
            }`;
        else if (typeof style == "object") (0, $050c63195fe7ace5$import$45c2c5d8174c652c$efb9f5caaa2ca0c7)`
            ${this.tagName}.${selector} {
                ${this._class.Style.style(style)}
            }`;
    }
    notify(name, options) {
        const event = new CustomEvent(name, options);
        this.dispatchEvent(event);
    }
}


export {$050c63195fe7ace5$export$f36d6a7a5c09a23e as define, $050c63195fe7ace5$export$906fdd6a257127ec as Adapter, $050c63195fe7ace5$export$e99fb5d841f44f27 as StyleClass, $050c63195fe7ace5$import$45c2c5d8174c652c$efb9f5caaa2ca0c7 as addStyle};
//# sourceMappingURL=adapter.js.map
