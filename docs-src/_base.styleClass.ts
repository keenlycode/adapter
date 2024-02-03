import { aspectRatio } from './_ux/style';

function styleClass() {
    const cssStyleSheet = new CSSStyleSheet();
    document.adoptedStyleSheets.push(cssStyleSheet);
    cssStyleSheet.replaceSync(/*css*/`
    .aspect-ratio-21-9 {
        display: flex;
        ${aspectRatio('21/9')}
        img {
            width: 100%;
            object-fit: cover;
        }
    }
    `);
};

styleClass();