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

document.querySelector('#blue-card-lift')!.css = `
    filter: drop-shadow(5px 5px 10px #444);
`;

document.querySelector('#blue-card-rotate')!.addStyle(`
    transform: rotate(45deg);
`);