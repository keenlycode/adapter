import { css } from '@devcapsule/adapter/src/style';

function baseStyle() {
    const cssStyleSheet = new CSSStyleSheet();
    cssStyleSheet.replaceSync(css`
    body {
        display: flex;
        justify-content: center;
    }
    h1 {
        margin: auto;
        text-align: center;
        max-width: 80ch;
    }
    p {
        margin: 0.7rem auto;
    }
    `);
    document.adoptedStyleSheets.push(cssStyleSheet);
};

export { baseStyle };