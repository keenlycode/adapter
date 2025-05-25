import { Adapter } from "../../lib/adapter.bundle.js";

class Card extends Adapter {};
Card.css = `
    display: inline-flex;
    box-sizing: border-box;
    border: 1px solid;
    border-radius: 5px;
    padding: 1rem;
`;
Card.define('el-card');

class BlueCard extends Card {};
BlueCard.css = `
    background-color: blue;
    color: white;
`;
customElements.define('el-bluecard', BlueCard);

BlueCard.addStyle(`
    &.largeFont { font-size: 2em }
`);

(document.querySelector('el-bluecard#blue-card-lift')! as BlueCard).css = `
    filter: drop-shadow(5px 5px 10px #444);
`;

(document.querySelector('el-bluecard#blue-card-rotate')! as BlueCard).addStyle(`
    transform: rotate(45deg);
`);

class ShadowHost extends Adapter {
    constructor() {
        super();
        const innerHTML = this.innerHTML;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot!.innerHTML = innerHTML;
    }
}

customElements.define('el-shadow-host', ShadowHost);
document.body.append(new BlueCard())
