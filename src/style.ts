/**
 *  Append style to parentNode
 * @constructor
 * @param {HTMLStyleElement} styleNode - Style node to set CSS string.
 * @param {string} css - CSS string
 * @param {HTMLElement} parentNode - Parent node to add style node.
 */

export function _addStyle(
        styleNode: HTMLStyleElement,
        css: string,
        parentNode: HTMLElement = document.head
    ): void {
    styleNode.textContent = css;
    parentNode.append(styleNode);
}

export function addStyle(css: string): HTMLStyleElement {
    const styleNode = document.createElement('style');
    _addStyle(styleNode, css);
    return styleNode;
}