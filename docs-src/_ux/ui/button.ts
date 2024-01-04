import { Adapter } from "../../adapter.js";
import Color from 'color';
import { bgColor, lift } from '../style';

const buttonStyle = (color) => {
    return /*css*/`
    & {
        display: inline-flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
    }

    & button {
        display: inline-flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        border: 0;
        border-radius: 0.25rem;
        padding: 0.5rem 0.7rem;
        font-weight: bold;
        line-height: 1;
        cursor: pointer;
        ${lift(0.7, '#555')}
        ${bgColor(color)}
        &:hover {
            background-color: ${Color(color)
                .lighten(0.1)
                .saturate(0.1)};
            ${lift(1.1, '#555')}
        }
        &:active {
            background-color: ${Color(color)
                .darken(0.1)
                .saturate(-0.1)};
            ${lift(0.5, '#555')}
        }
    }
    `
}

class Button extends Adapter {
    initialHTML = this.innerHTML;

    constructor() {
        super();
        this.render();
    }

    render() {
        this.innerHTML = `<button>${this.initialHTML}</button>`;
    }
};

export { buttonStyle, Button };