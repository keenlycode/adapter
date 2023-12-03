export function addStyle(
        style: string,
        document: Document = window.document): HTMLStyleElement {
    const styleNode = document.createElement('style');
    styleNode.textContent = style;
    document.querySelector('head')?.append(styleNode);
    return styleNode;
}