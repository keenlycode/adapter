import { css } from '@devcapsule/adapter/src/style';

function baseStyle() {
    const cssStyleSheet = new CSSStyleSheet();
    cssStyleSheet.replaceSync(css`
    div.container {
        @media screen and (min-width: 1200px) {
            margin-left: 30ch;
            width: calc(100dvw - 30ch);
        }
    }
    `);
    document.adoptedStyleSheets.push(cssStyleSheet);
};

export { baseStyle };