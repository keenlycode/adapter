import { Adapter } from "../../adapter.js";

const css = String.raw;

const sidebarStyle = (): string => {
  const style = css`
    all: unset;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    z-index: 100;
    width: 28ch;
    min-height: 50dvh;
    background-color: white;

    &.show {
      transform: translateX(0);
    }

    &.hide {
      transform: translateX(-100%);
    }
  `.trim();
  return style;
};

class Sidebar extends Adapter {
  static css = `${sidebarStyle()}`;

  constructor() {
    super();
  }

  show() {
    this.classList.remove("hide");
    this.classList.add("show");
  }

  hide() {
    this.classList.remove("show");
    this.classList.add("hide");
  }

  toggle() {
    if (this.classList.contains("show")) {
      this.hide();
    } else {
      this.show();
    }
  }
}

export { Sidebar, sidebarStyle };
