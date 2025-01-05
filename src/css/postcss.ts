// @ts-nocheck
import _postcss from "../bundle/postcss.bundle.js";


function postcss(plugins=[]) {
  return function css(strings: TemplateStringsArray, ...values: any[]): string {
    // Combine strings and values
    const css = String.raw({ raw: strings }, ...values);

    // Process the CSS with PostCSS and plugins
    const result = _postcss(plugins).process(css);

    // Return the processed CSS
    return result.css;
  }
}

export { postcss };
