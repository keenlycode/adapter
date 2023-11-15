import { Adapter, css } from '../src/export';

new EventSource('/esbuild').addEventListener('change', () => location.reload());

export class Card extends Adapter {}

Card.style(`
    display: flex;
    color: red;
    background-color: blue;
`);

Card.classStyle(`white-text`, `
    color: white;
`)