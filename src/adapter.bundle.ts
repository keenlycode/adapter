import * as adapter from './adapter';

import { addStyle } from './add-style';

const url: any = new URL(document.currentScript.src)
const importAs = url.searchParams.get('as') || 'adapter';
window[importAs] = adapter;