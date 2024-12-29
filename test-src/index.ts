/** Mocha test framework */
import mocha from "mocha/mocha";
import "mocha/mocha.css";
import { assert } from "chai";

/** Adapter */
import { Adapter, AdapterMixin } from "@devcapsule/adapter/src/export";

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
  checkLeaks: true,
});

const render = document.querySelector('#render') as HTMLElement;

describe("Adapter Class: Use Case", () => {
  class Card1 extends Adapter { }
  class Card2 extends Adapter { }
  class RedCard extends Card1 { }

  it("Should be extendable", () => {
    assert(Object.getPrototypeOf(Card1) === Adapter);
  });

  it("Each sub-class or sibling-class should have different styles object", () => {
    assert(
      Card1.adapter.styles !== Card2.adapter.styles,
      `Card1.styles !== Card2.styles`
    );
    assert(
      Card1.adapter.styles !== RedCard.adapter.styles,
      `Card1.styles !== RedCard.styles`
    );
  });

  it("Should be able to define tagName", () => {
    Card1.define("el-card1");
    assert(Card1.adapter.tagName?.toLowerCase() === "el-card1");
    customElements.define("el-card2", Card2);
    const card2 = new Card2();
    assert(card2.tagName.toLowerCase() === "el-card2");
    assert(card2._adapter._class.adapter.tagName?.toLowerCase() === "el-card2");
  });

  it("Should be able to create instance", () => {
    const card1 = new Card1();
    assert(card1 instanceof Card1);
    assert(card1 instanceof Adapter);
  });

  it("Should be able to use API: addStyle()", () => {
    Card1.addStyle(`
      display: flex;
      button {
        color: red;
      }
    `);
    assert(Card1.adapter.allStyle.includes(`display: flex;`));
    Card2.addStyle(`display: block;`);
    assert(Card2.adapter.allStyle.includes(`display: block;`));
  });

  it("Should inherit style from super class", () => {
    RedCard.addStyle(`background-color: red;`);
    assert(RedCard.adapter.allStyle.includes(`display: flex;`));
    assert(RedCard.adapter.allStyle.includes("display: flex;"));
    assert(RedCard.adapter.allStyle.includes("background-color: red;"));
    RedCard.define("el-red-card");
    assert(
      RedCard.adapter.cssStyleSheet.cssRules[0].cssText.includes(
        "display: flex;"
      )
    );
  });

  it("Should be able to set css in class declaration", () => {
    class Card3 extends Adapter {
      static {
        this.css = `
          display: grid;
          &.red {
            color: red;
          }
        `
      }
      constructor() {
        super();
        this.innerHTML = "Card3";
      }
    }
    Card3.define("el-card3");
    assert(Card3.css.includes("display: grid;"));
    assert(Card3.css.includes("&.red"));
  });

  it("Should be able to set css for component", () => {
    const additionStyle = `background-color: red;`;
    RedCard.css = additionStyle;
    assert(RedCard.adapter.allStyle.includes(additionStyle));
    assert(RedCard.adapter.allStyle.includes(Card1.css));
  });

  it("Class' CSSStyleSheet() should be adopted by document", () => {
    assert(document.adoptedStyleSheets.includes(Card1.adapter.cssStyleSheet));
    assert(document.adoptedStyleSheets.includes(Card2.adapter.cssStyleSheet));
    assert(document.adoptedStyleSheets.includes(RedCard.adapter.cssStyleSheet));
  });
});

describe("Adapter Object: Use Case", () => {
  class Button1 extends Adapter { }
  Button1.css = `visibility: hidden;`;
  class Button2 extends Adapter { }
  Button2.css = `visibility: hidden`;

  Button1.define("el-button1");
  customElements.define("el-button2", Button2);

  const button1 = new Button1();
  const button2 = new Button2();

  it("Should inherited from parent class properly", () => {
    assert(button1 instanceof Button1);
    assert(button1 instanceof Adapter);
  });

  it("constructor() should be called and setup the instance", () => {
    assert(button1._adapter._class === Button1);
    assert(button1._adapter._class.tagName === "el-button1");
    assert(
      document.adoptedStyleSheets.includes(button1._adapter._class.adapter.cssStyleSheet)
    );

    assert(button2._adapter._class === Button2);
    assert(button2._adapter._class.tagName?.toLowerCase() === "el-button2");
    assert(
      document.adoptedStyleSheets.includes(button2._adapter._class.adapter.cssStyleSheet)
    );
  });

  it("It's uuid should be unique", () => {
    assert(button1._adapter.uuid !== button2._adapter.uuid);
  });

  it(`Should have cssStyleSheet and is adopted by document`, () => {
    assert(button1._adapter.cssStyleSheet instanceof CSSStyleSheet);
    assert(button2._adapter.cssStyleSheet instanceof CSSStyleSheet);
    document.body.append(button1);
    document.body.append(button2);
    assert(document.adoptedStyleSheets.includes(button1._adapter.cssStyleSheet));
    assert(document.adoptedStyleSheets.includes(button2._adapter.cssStyleSheet));
  });

  it("Can set css for this instance", () => {
    button1.css = `display: flex;`;
    assert(
      button1._adapter.cssStyleSheet.cssRules[0].cssText.includes(
        "display: flex;"
      )
    );
  });

  it("Can get CSS for this instance", () => {
    assert(button1.css.includes("display: flex;"));
  });

  it("Can add style for this instance", () => {
    button1.addStyle(`background-color: red;`);
    assert(
      button1._adapter.cssStyleSheet.cssRules[1].cssText.includes(
        "background-color: red;"
      )
    );
  });

  it("Can be removed from document", () => {
    button1.remove();
    button2.remove();
    assert(!document.adoptedStyleSheets.includes(button1._adapter.cssStyleSheet));
    assert(!document.adoptedStyleSheets.includes(button2._adapter.cssStyleSheet));
  });
});

describe("Adapter Mixin: Use Case", () => {
  class Pin1 extends AdapterMixin(HTMLElement) { }
  class Pin2 extends AdapterMixin(Pin1) { }

  Pin1.define("el-pin1");
  Pin2.define("el-pin2");

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

describe("Shadow DOM Support", () => {
  class ShadowHost extends Adapter {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  }
  ShadowHost.css = `visibility: hidden`;

  class Button extends Adapter { }
  Button.css = `
    display: flex;
    justify-content: center;
    color: white;
    background-color: red;
    width: 100px;
    height: 2rem;
  `;

  Button.define("el-button");
  ShadowHost.define("el-shadow-host");

  it(`Component is styled under Shadow DOM`, () => {
    const shadowHost = new ShadowHost();
    const button = new Button();
    shadowHost.shadowRoot?.append(button);
    document.body.append(shadowHost);
    assert(getComputedStyle(button).backgroundColor === "rgb(255, 0, 0)");
  });
});

mocha.run();
