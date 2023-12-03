export function addStyle(
        css: string,
        parentNode: HTMLElement,
        document: Document): HTMLStyleElement {
    const styleNode = document.createElement('style');
    styleNode.textContent = css;
    parentNode.append(styleNode);
    return styleNode;
}