import './_base.lib.js';

import'./_base.style.js';

import './_base.comp.js';

import './_base.styleClass.js';

import { pageReload } from './_base.esbuild.js';

pageReload('./');

window.addEventListener('load', () => {
    document.body.style.visibility = 'visible';
});
