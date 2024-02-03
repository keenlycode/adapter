import './_base.lib';

import'./_base.style';

import './_base.comp';

import './_base.styleClass';

import { pageReload } from './_base.esbuild';

pageReload('./');

window.addEventListener('load', () => {
    document.body.style.visibility = 'visible';
});