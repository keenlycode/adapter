import { define, StyleClass, Adapter, addStyle } from './adapter';

export const adapter = {
    "define": define,
    "StyleClass": StyleClass,
    "Adapter": Adapter,
    "addStyle": addStyle
}

const url: any = new URL(document.currentScript!.src)
const importAs = url.searchParams.get('as') || 'adapter';
window[importAs] = adapter;