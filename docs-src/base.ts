import 'highlight.js/styles/monokai.css';

import { baseLib } from './_base.lib';
baseLib();

import { baseStyle } from './_base.style';
baseStyle('./');

import { baseComponents } from './_base.comp';
baseComponents('./');

import { pageReload } from './_base.esbuild';
pageReload('./');

import { styleClass } from './_base.styleClass';
styleClass();

window.addEventListener('load', () => {
    document.body.style.visibility = 'visible';
});