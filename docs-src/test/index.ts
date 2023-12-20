import mocha from "mocha/mocha";
import "mocha/mocha.css";
import { assert } from "chai";

import { Adapter, AdapterMixin } from "@devcapsule/adapter/src/export";

const __base_url = new URL(import.meta.url);

if (["0.0.0.0", "127.0.0.1", "localhost"].includes(__base_url.hostname)) {
    new EventSource("/esbuild").addEventListener("change", () =>
        location.reload()
    );
}

const css = String.raw;
const style = new CSSStyleSheet();
document.adoptedStyleSheets.push(style);
style.replaceSync(css`
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

mocha.setup("bdd");

mocha.checkLeaks();

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
        Card1.addStyle(css`display: flex;`);
        Card2.addStyle(css`display: block;`);
    });

    it("Should inherit style from super class", () => {
        assert(RedCard.css === Card1.css);
        RedCard.addStyle(css`background-color: red;`);
        assert(RedCard.css.includes("display: flex;"));
        assert(RedCard.css.includes("background-color: red;"));
        RedCard.define("el-red-card");
    });

    it("Should be able to set css in class declaration", () => {
        class Card3 extends Adapter {
            static css = css`display: grid;`;
        };
        assert(Card3.css.includes("display: grid;"));
    });

    it("Should be able to set the whole css for this component", () => {
        Card1.css = css`display: flex;`;
        assert(RedCard.css.includes("display: flex;"));

        /** This should not affect inherited styles */
        RedCard.css = css`background-color: red;`;
        
        assert(RedCard.css.includes("display: flex;"));
        assert(RedCard.css.includes("background-color: red;"));
    });

    it("Class' CSSStyleSheet() should be adopted by document", () => {
        assert(document.adoptedStyleSheets.includes(Card1.cssStyleSheet));
        assert(document.adoptedStyleSheets.includes(Card2.cssStyleSheet));
        assert(document.adoptedStyleSheets.includes(RedCard.cssStyleSheet));
    });
});

describe("Adapter Object: Use Case", () => {
    it("Should be able to create instance", () => {
        Adapter.define("el-adapter");
        const card = new Adapter();
        assert(card instanceof Adapter);
    });
});

mocha.run();
