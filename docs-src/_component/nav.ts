import { html, render } from 'uhtml';
import { define, Adapter } from '@nitipit/adapter/src/adapter';

import { bgColor } from 'gadjet/src/style/bg-color';

import { color } from '../color';


export class Nav extends Adapter {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        return render(this, html`
        <div class="container">
            <a href=${`${this.dataset.toRoot}index.html`}>Intro</a>
            <a href=${`${this.dataset.toRoot}usage/usage.html`}>Usage</a>
            <a href=${`${this.dataset.toRoot}api/api.html`}>API</a>
        </div>
        `)
    }
};

define('el-nav', Nav);
Nav.tagStyle(`
    display: flex;
    width: 100%;
    ${bgColor(color.p)}
    a {
        padding: 0.5rem 1rem;
        text-decoration: none;
        font-weight: bold;
        cursor: pointer;
        ${bgColor(color.p)}
        &:hover {
            ${bgColor('white')}
        }
    }
`);