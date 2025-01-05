// @ts-nocheck
import _postcss, { AcceptedPlugin, ProcessOptions, Result } from "./bundle/postcss.bundle.js";

// @ts-check
function postcss(plugins: AcceptedPlugin[] = []) {
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
