import { html, render } from 'uhtml';
import { define, Adapter } from '@nitipit/adapter/src/adapter';

import { bgColor } from 'gadjet/src/style/bg-color';

import { color } from '../color';


export class Nav extends Adapter {};

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