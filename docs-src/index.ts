import { Adapter } from '../src/adapter';

new EventSource('/esbuild').addEventListener('change', () => location.reload());

class Card extends Adapter {
    constructor() {
        super();
    }
}

Card.define('el-card');
Card.tagStyle(`color: red`);
Card.classStyle('blue', `color: blue`);