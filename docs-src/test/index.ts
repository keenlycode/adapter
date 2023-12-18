import mocha from 'mocha/mocha';
import 'mocha/mocha.css';
import { assert } from 'chai';

import { Adapter } from '@devcapsule/adapter';

const __base_url = new URL(import.meta.url);

if (['0.0.0.0', '127.0.0.1', 'localhost'].includes(__base_url.hostname)) {
    new EventSource('/esbuild').addEventListener(
        'change',
        () => location.reload());
}

const css = String.raw;
const style = new CSSStyleSheet();
document.adoptedStyleSheets.push(style);

mocha.setup('bdd');

// mocha.checkLeaks();

describe('Adapter Inheritance', function() {
    class Card extends Adapter {};
    it('Should be extendable', () => {
        assert(Object.getPrototypeOf(Card) === Adapter);
    })
    it('Should be able to define tag-name', () => {
        Card.define('el-card');
        assert(Card.tagName === 'el-card');
    })
    it('Should return class instance', () => {
        const card = new Card();
        assert(card instanceof Card);
        card.innerHTML = '<h2>Card</h2>';
        document.querySelector('#render')!.append(card);
    })
    it('Should be able to use API: addStyle()', () => {
        Card.addStyle(css`
            display: flex;
            justify-content: center;
            align-items: center;
            margin: auto;
            min-width: 200px;
            max-width: 300px;
            min-height: 100px;
            width: 90%;
            background-color: white;
            border: 2px solid;
            border-radius: 10px;
            margin: 1rem auto;
        `);
    })
    it('Should inherit style from parent class', () => {
        class RedCard extends Card {};
        RedCard.define('el-card-red');
        RedCard.addStyle(css`
            background-color: red;
        `)
        const redCard = new RedCard();
        redCard.innerHTML = '<h2>Red Card</h2>';
        document.querySelector('#render')!.append(redCard);
    })

});

mocha.run();