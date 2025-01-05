// @ts-nocheck
import {compile, serialize, stringify, middleware, prefixer} from './bundle/stylis.bundle.js';


function stylis(middlewares=[]): string {
  return function css(strings: TemplateStringsArray, ...values: any[]): string {
    middlewares = [...middlewares, stringify];

    // Combine strings and values
    const css = String.raw({ raw: strings }, ...values);

    return serialize(compile(css), middleware(middlewares))
  }
}

const css = stylis([prefixer]);

export { css };
