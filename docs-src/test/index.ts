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

class Row extends Adapter {}
// Row.define('el-row');
customElements.define("el-row", Row);
Row.tagStyle(css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
`);

describe("Adapter Class", function () {
    const row = new Row();
    document.querySelector("#render")?.append(row);
    class Card1 extends Adapter {};
    class Card2 extends Adapter {};

    it("Should be extendable", () => {
        assert(Object.getPrototypeOf(Card1) === Adapter);
    });

    it("Sub-classes should have different styles", () => {
        assert(Card1.styles !== Card2.styles,
            `Card1.styles !== Card2.styles`
        );
        Card1.addStyle(css`background-color: red;`);
        Card2.addStyle(css`background-color: blue;`);
        assert(Card1.css !== Card2.css, `Card1.css !== Card2.css`);
    });

    it("Should be able to define tagName", () => {
        Card1.define("el-card1");
        assert(Card1.tagName === "el-card1");
    });

    it("Should be able to create instance", () => {
        const card1 = new Card1();
        assert(card1 instanceof Card1);
        assert(card1 instanceof Adapter);
    });

    it("Should raise error when define same tagName", () => {
        Card2.define("el-card1");
    });

    it("Should be able to use API: addStyle()", () => {
        Card.addStyle(css`
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            min-width: 200px;
            max-width: 300px;
            min-height: 100px;
            width: 90%;
            background-color: white;
            border: 2px solid;
            border-radius: 10px;
            margin: 1rem 1rem;
        `);
    });
    it("Should inherit style from parent class", () => {
        class RedCard extends Card {}
        RedCard.addStyle(css`
            background-color: red;
        `);
        // RedCard.define('el-card-red');
        customElements.define("el-red-card", RedCard);
        const redCard = new RedCard();
        redCard.innerHTML = "<h2>Red Card</h2>";
        row.append(redCard);
    });
});

describe("AdapterMixin Class", () => {
    const row = new Row();
    document.querySelector("#render")?.append(row);
    it("Should be able to extends from another HTMLElement subclass", () => {
        class Tag extends AdapterMixin(HTMLElement) {
            static css = css`
                background-color: aquamarine;
            `;
        }

        Tag.addStyle(css`
            display: inline-flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            padding: 0.2rem 0.7rem 0.2rem 0.7rem;
            border: 4px solid darkseagreen;
            border-radius: 5px;
            line-height: 1.5;
        `);

        // Tag.define('el-tag');
        customElements.define("el-tag", Tag);
        const tag = new Tag();
        tag.innerHTML = "tag";
        row.append(tag);

        class Badge extends AdapterMixin(Tag) {
            static css = css`
                background-color: blue;
            `;
        }

        // Badge.define('el-badge');
        customElements.define("el-badge", Badge);
        Badge.addStyle(
            css`
                color: white;
            `
        );
        let badge = new Badge();
        badge.innerHTML = "*";
        row.append(badge);

        for (let i = 0; i < 5; i++) {
            badge = new Badge();
            badge.innerHTML = i.toString();
            row.append(badge);
        }
    });
});

describe("test", () => {
    class Card1 extends Adapter {
        static css = `background-color: red`;
    }
    class Card2 extends Card1 {}
    class Card3 extends Card2 {}

    console.log(Card1.css);
    console.log(Card2.css);
    console.log(Card3.css);
});

mocha.run();
