export function addStyle(style: string): HTMLStyleElement {
    const styleNode = document.createElement('style');
    styleNode.textContent = style;
    document.querySelector('head')?.append(styleNode);
    return styleNode;
}