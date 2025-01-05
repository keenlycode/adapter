// @ts-nocheck
import {compile, serialize, stringify, middleware} from './bundle/stylis.bundle.js';

// @ts-check
function stylis(middlewares=[]): string {
  return function css(strings: TemplateStringsArray, ...values: any[]): string {
    middlewares = [...middlewares, stringify];

    // Combine strings and values
    const css = String.raw({ raw: strings }, ...values);

    return serialize(compile(css), middleware(middlewares))
  }
}

export { stylis };
