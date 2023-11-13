export function css(
    tstrings: TemplateStringsArray,
    ...values: Array<any>
): string {
    return String.raw({raw: tstrings}, ...values);
}

export function addStyle(
    tstrings: TemplateStringsArray,
    ...values: Array<any>
): HTMLStyleElement {
    const styleNode = document.createElement('style');
    styleNode.textContent = css(tstrings, ...values);
    document.querySelector('head')?.append(styleNode);
    return styleNode;
}