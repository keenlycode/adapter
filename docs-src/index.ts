import { Adapter } from '@devcapsule/adapter/src/adapter';

class Card extends Adapter {
    constructor() {
        super();
    }
}

Card.define('el-card');
Card.tagStyle(`color: red`);
Card.classStyle('blue', `color: blue`);