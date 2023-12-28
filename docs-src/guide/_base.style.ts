import { css } from '@devcapsule/adapter/src/style';

function baseStyle() {
    const cssStyleSheet = new CSSStyleSheet();
    cssStyleSheet.replaceSync(css`
    body {
        display: flex;
        justify-content: center;
    }
    h1, h2, h3 {
        margin: auto;
        max-width: 80ch;
    }
    h1 { text-align: center }
    p {
        margin: 0.7rem auto;
    }
    `);
    document.adoptedStyleSheets.push(cssStyleSheet);
};

export { baseStyle };