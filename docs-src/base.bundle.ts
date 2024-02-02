import './lib/lib.run.bundle.js';

import { baseStyle } from './_base.style';
baseStyle();

import { baseComponents } from './_base.comp';
baseComponents();

import { styleClass } from './_base.styleClass';
styleClass();

import { pageReload } from './_base.esbuild';
pageReload();

window.addEventListener('load', () => {
    document.body.style.visibility = 'visible';
});