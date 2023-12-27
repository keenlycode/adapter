import { css } from '@devcapsule/adapter/src/style';

function baseStyle() {
    const cssStyleSheet = new CSSStyleSheet();
    cssStyleSheet.replaceSync(css`
    h1 {
        margin: auto;
        text-align: center;
    }
    div.container {
        max-width: 80ch;
        width: 90%;
        margin: auto;
        @media screen and (min-width: 1200px) {
            margin-left: 35ch;
            width: calc(100dvw - 42ch);
        }
    }
    `);
    document.adoptedStyleSheets.push(cssStyleSheet);
};

export { baseStyle };