import { Adapter } from '../../adapter';

class Card extends Adapter {
    static css = `
        display: inline-flex;
        box-sizing: border-box;
        border: 1px solid;
        border-radius: 5px;
        padding: 1rem;
    `;
};
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

document.querySelector('el-bluecard#blue-card-lift')!.css = `
    filter: drop-shadow(5px 5px 10px #444);
`;

document.querySelector('el-bluecard#blue-card-rotate')!.addStyle(`
    transform: rotate(45deg);
`);

class BlueCardShadow extends BlueCard {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot!.innerHTML = `This card use open Shadow DOM`;
    }
}

customElements.define('el-bluecard-shadow', BlueCardShadow);

class BlueCardShadowClosed extends BlueCard {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'closed' });
        shadowRoot.innerHTML = `This card use closed Shadow DOM`;
    }
}

customElements.define('el-bluecard-shadow-closed', BlueCardShadowClosed);