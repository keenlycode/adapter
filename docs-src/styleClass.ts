import { css } from '@devcapsule/adapter';
import { aspectRatio } from 'gadjet/src/style';

const cssStyleSheet = new CSSStyleSheet();

cssStyleSheet.replaceSync(css`
.aspect-ratio-21-9 {
    display: flex;
    ${aspectRatio('21/9')}
    img {
        width: 100%;
        object-fit: cover;
    }
}
`);

document.adoptedStyleSheets.push(cssStyleSheet);
