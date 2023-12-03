/**
 * Create <style> then append to parentNode
 * @constructor
 * @param {string} css - CSS string
 * @param {HTMLElement} parentNode - Parent node to add <style>
 * @param {Document} document - DOM Document
 */

export function addStyle(
        css: string,
        parentNode: HTMLElement,
        document: Document): HTMLStyleElement {
    const styleNode = document.createElement('style');
    styleNode.textContent = css;
    parentNode.append(styleNode);
    return styleNode;
}