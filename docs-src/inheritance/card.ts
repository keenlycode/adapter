import { Adapter, css } from '../../src/export';
import { html, render } from 'uhtml';

new EventSource('/esbuild')
    .addEventListener('change', () => location.reload());

class Card extends Adapter {
    constructor() {
        super();
        this.render("Aquamarine");
    }
    render(color: string) {
        render(this, html`
            <h1>${this.constructor.name}'s color is ${color}</h1>
        `);
        this.addStyle(css`
            background-color: ${color};
        `)
    }
};

Card.tagStyle(css`
    display: flex;
    color: black;
    height: 40vh;
    border: 1px solid;
`);

class Card1 extends Card {
    constructor() {
        super();
        this.render("Aquamarine");
        // this.render("LightCyan");
    }
}

class Card2 extends Card1 {
    constructor() {
        super();
        this.render('Bisque');
        // this.render('PaleVioletRed');
    }
};

export { Card1, Card2 }