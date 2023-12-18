import mocha from 'mocha/mocha';
import 'mocha/mocha.css';
import { assert } from 'chai';

import { Adapter } from '@devcapsule/adapter';


mocha.setup('bdd');

mocha.checkLeaks();

describe('Adapter Inheritance', function() {
    class Card extends Adapter {};
    it('Should be exendable', () => {
        assert(Object.getPrototypeOf(Card) === Adapter);
    })
    it('Should be able to define tag-name', () => {
        Card.define('el-card');
    })
});

mocha.run();