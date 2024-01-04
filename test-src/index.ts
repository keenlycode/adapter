/** Mocha test framework */
import mocha from "mocha/mocha";
import "mocha/mocha.css";
import { assert } from "chai";

/** LigntningCSS */
import init, { transform, browserslistToTargets } from 'https://esm.run/lightningcss-wasm';
import browserslist from 'browserslist';

/** Adapter */
import { Adapter, AdapterMixin } from "@devcapsule/adapter/src/adapter";
import { stylis } from '@devcapsule/adapter/src/cssProcessor/stylis.bundle';

const __base_url = new URL(import.meta.url);

if (["0.0.0.0", "127.0.0.1", "localhost"].includes(__base_url.hostname)) {
    new EventSource("/esbuild").addEventListener("change", () =>
        location.reload()
    );
}

const style = new CSSStyleSheet();

document.adoptedStyleSheets.push(style);
style.replaceSync(`
    body {
        padding-bottom: 10rem;
    }
    #render {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        align-items: center;
    }
`);

mocha.setup({
    ui: "bdd",
    checkLeaks: true
});

describe("Adapter Class: Use Case", function () {
    class Card1 extends Adapter {};
    class Card2 extends Adapter {};
    class RedCard extends Card1 {};

    it("Should be extendable", () => {
        assert(Object.getPrototypeOf(Card1) === Adapter);
    });

    it("Each sub-class or sibling-class should have different styles object", () => {
        assert(Card1.styles !== Card2.styles,
            `Card1.styles !== Card2.styles`
        );
        assert(Card1.styles !== RedCard.styles,
            `Card1.styles !== RedCard.styles`
        );
    });

    it("Should be able to define tagName", () => {
        Card1.define("el-card1");
        assert(Card1.tagName?.toLowerCase() === "el-card1");
        customElements.define("el-card2", Card2);
        const card2 = new Card2();
        assert(card2.tagName.toLowerCase() === "el-card2");
        assert(card2._class.tagName?.toLowerCase() === "el-card2");
    });

    it("Should be able to create instance", () => {
        const card1 = new Card1();
        assert(card1 instanceof Card1);
        assert(card1 instanceof Adapter);
    });

    it("Should be able to use API: addStyle()", () => {
        Card1.addStyle(`display: flex;`);
        Card2.addStyle(`display: block;`);
    });

    it("Should inherit style from super class", () => {
        RedCard.addStyle(`background-color: red;`);
        assert(RedCard.allCSS.includes("display: flex;"));
        assert(RedCard.css.includes("background-color: red;"));
        RedCard.define("el-red-card");
    });

    it("Should be able to set css in class declaration", () => {
        class Card3 extends Adapter {
            static css = `display: grid;`;
            constructor() {
                super();
                this.innerHTML = "Card3";
            }
        };
        Card3.define("el-card3");
        Card3.css = `${Card3.css} &.red {color: red}`;
        assert(Card3.css.includes("display: grid;"));
        assert(Card3.css.includes("&.red {color: red}"));
    });

    it("Should be able to set css for this component", () => {
        const additionStyle = `background-color: red;`;
        RedCard.css = additionStyle;
        assert(RedCard.allCSS.includes(additionStyle));
        assert(RedCard.allCSS.includes(Card1.css));
    });

    it("Class' CSSStyleSheet() should be adopted by document", () => {
        assert(document.adoptedStyleSheets.includes(Card1.cssStyleSheet));
        assert(document.adoptedStyleSheets.includes(Card2.cssStyleSheet));
        assert(document.adoptedStyleSheets.includes(RedCard.cssStyleSheet));
    });
});

describe("Adapter Object: Use Case", () => {
    class Button1 extends Adapter {};
    class Button2 extends Adapter {};
    Button1.define("el-button1");
    customElements.define('el-button2', Button2);
    const button1 = new Button1();
    const button2 = new Button2();

    it("Should inherited from parent class properly", () => {
        assert(button1 instanceof Button1);
        assert(button1 instanceof Adapter);
    });

    it("constructor() should be called and setup the instance", () => {
        assert(button1._class === Button1);
        assert(button1._class.tagName === "el-button1");
        assert(document.adoptedStyleSheets.includes(button1._class.cssStyleSheet));

        assert(button2._class === Button2);
        assert(button2._class.tagName?.toLowerCase() === "el-button2");
        assert(document.adoptedStyleSheets.includes(button2._class.cssStyleSheet));
    });

    it("It's uuid should be unique", () => {
        assert(button1.uuid !== button2.uuid);
    });

    it(`Should have cssStyleSheet and is adopted by document`, () => {
        assert(button1.cssStyleSheet instanceof CSSStyleSheet);
        assert(button2.cssStyleSheet instanceof CSSStyleSheet);
        assert(document.adoptedStyleSheets.includes(button1.cssStyleSheet));
        assert(document.adoptedStyleSheets.includes(button2.cssStyleSheet));
    });

    it("Should have adoptedStyleSheetIndex", () => {
        assert(button1.adoptedStyleSheetIndex !== null);
        assert(button2.adoptedStyleSheetIndex !== null);
    });

    it("Can set css for this instance", () => {
        button1.css = `display: flex;`;
        assert(button1.cssStyleSheet.cssRules[0].cssText.includes("display: flex;"));
    });

    it("Can add style for this instance", () => {
        button1.addStyle(`background-color: red;`);
        assert(button1.cssStyleSheet.cssRules[1].cssText.includes("background-color: red;"));
    });

    it("Can be deleted from document", () => {
        button1.delete();
        assert(!document.adoptedStyleSheets.includes(button1.cssStyleSheet));
    });
});

describe("Adapter Mixin: Use Case", () => {
    class Pin1 extends AdapterMixin(HTMLElement) {};
    class Pin2 extends AdapterMixin(Pin1) {};

    Pin1.define('el-pin1');
    Pin2.define('el-pin2');

    const pin1 = new Pin1();
    const pin2 = new Pin2();
    it("Should be able to mixin", () => {
        assert(pin1 instanceof Pin1);
        assert(pin1 instanceof HTMLElement);
        assert(pin2 instanceof Pin2);
        assert(pin2 instanceof Pin1);
        assert(pin2 instanceof HTMLElement);
    });
});

await init();

describe("CSS Processor", () => {
    it('Can use stylis processor', () => {
        class MyAdapter extends Adapter {
            static cssProcess(css: string): string {
                return stylis(css);
            }

            static css = `
                display: flex;
                min-height: 20vh;
                background-color: #eee;
                &.red {
                    background-color: red;
                }
            `
        }
        MyAdapter.define('el-adapter-stylis');
        /** This will prove that stylis works as expected
         * because it will create `<element>.red` rule from `&.red`
         */
        assert(MyAdapter.cssStyleSheet.cssRules[1].cssText.includes('el-adapter-stylis.red'));
    })

    it('Can use lightningcss-wasm processor (beta)', async () => {
        class MyAdapter extends Adapter {
            static cssProcess(css: string): string {
                let {code} = transform({
                    code: new TextEncoder().encode(css),
                    sourceMap: false,
                    targets: browserslistToTargets(browserslist('>= 0.25%'))
                });
                code = new TextDecoder().decode(code);
                return code;
            }

            static css = `
                display: flex;
                min-height: 20vh;
                background-color: #eee;
                &.red {
                    background-color: red;
                }
            `
        }

        MyAdapter.define('el-adapter-lightningcss');
        /** This will prove that stylis works as expected
         * because it will create `<element>.red` rule from `&.red`
         */
        assert(MyAdapter.cssStyleSheet.cssRules[1].cssText.includes('el-adapter-lightningcss.red'));
    })
});

describe("Shadow DOM Support", () => {
    class ShadowComponent extends Adapter {
        static css = `color: red;`;

        constructor() {
            super();
            this._shadowRoot = this.attachShadow({mode: 'closed'});
            this._shadowRoot.innerHTML = 'Shadow DOM';
        }
    }

    class ShadowClosedComponent extends Adapter {
        static css = `color: red;`;

        constructor() {
            super();
            this._shadowRoot = this.attachShadow({mode: 'closed'});
            this._shadowRoot.innerHTML = 'Shadow DOM';
        }
    }
    ShadowComponent.define('el-shadow-component');
    ShadowClosedComponent.define('el-shadow-closed-component');

    it(`Can style attachShadow({mode: 'open'})`, () => { 
        const component = new ShadowComponent();
        component.hidden = true;
        document.body.appendChild(component);
        assert(getComputedStyle(component).color === 'rgb(255, 0, 0)');
    })
    
    it(`Can style attachShadow({mode: 'closed'})`, () => { 
        const component = new ShadowClosedComponent();
        component.hidden = true;
        document.body.appendChild(component);
        assert(getComputedStyle(component).color === 'rgb(255, 0, 0)');
    })
})

mocha.run();