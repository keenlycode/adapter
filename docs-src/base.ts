import './_base.lib';
import './_base.comp';
import './_base.style';
import './_ux/style';

const __base_url = new URL(import.meta.url);
const __event_source = new URL('./esbuild', __base_url.href)

if (['0.0.0.0', '127.0.0.1', 'localhost'].includes(__base_url.hostname)) {
    new EventSource(__event_source).addEventListener(
        'change',
        () => location.reload());
}

const __fira_sans_url = new URL('./asset/font/FiraSans-Regular.ttf', __base_url.href);
const __fira_code_url = new URL('./asset/font/FiraCode-Variable.ttf', __base_url.href);
const css = String.raw;


const style = new CSSStyleSheet();
document.adoptedStyleSheets.push(style);

style.replaceSync(css`
@font-face {
    font-family: sans;
    src: url(${__fira_sans_url});
}

@font-face {
    font-family: monospace;
    src: url(${__fira_code_url});
}
`)