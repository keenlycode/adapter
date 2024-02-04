function baseStyle() {
  const cssStyleSheet = new CSSStyleSheet();
  cssStyleSheet.replaceSync(/*css*/`
    body {
        display: flex;
        justify-content: center;
        > el-container:first-of-type {
            margin-top: 2rem;
        }
    }
    h1, h2, h3 {
        margin: auto;
        max-width: 80ch;
    }
    h1 {
        text-align: center
    }
    h2{
        margin-top: 2.5rem;
    }
    h3 {
        margin-top: 1.5rem;
    }
    p {
        margin: 1rem auto;
    }
  `);
  document.adoptedStyleSheets.push(cssStyleSheet);
};

baseStyle();