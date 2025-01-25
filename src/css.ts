// @ts-nocheck
import {compile, serialize, stringify, middleware, prefixer} from './bundle/stylis.bundle.js';

function stylis(middlewares=[]):
    (strings: TemplateStringsArray, ...values: any[]) => string {
  return function css(strings: TemplateStringsArray, ...values: any[]): string {
    const _middlewares = [...middlewares, stringify];

    // Combine strings and values
    let css = String.raw({ raw: strings }, ...values);
    css = serialize(compile(css), middleware(_middlewares));
    return css;
  }
}

const css = stylis([prefixer]);

export { css, stylis };
