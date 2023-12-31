import { css } from '@devcapsule/adapter';

function baseStyle() {
    const cssStyleSheet = new CSSStyleSheet();
    cssStyleSheet.replaceSync(css`
    body {
        display: flex;
        justify-content: center;
        padding-top: 2rem;
    }
    h1, h2, h3 {
        margin: auto;
        max-width: 80ch;
    }
    h1 { text-align: center }
    p {
        margin: 1rem auto;
    }
    `);
    document.adoptedStyleSheets.push(cssStyleSheet);
};

export { baseStyle };