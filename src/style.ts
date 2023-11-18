export function css(
    tstrings: TemplateStringsArray,
    ...values: Array<any>
): string {
    return String.raw({raw: tstrings}, ...values);
}

export function addStyle(style: string): HTMLStyleElement {
    const styleNode = document.createElement('style');
    styleNode.textContent = style;
    document.querySelector('head')?.append(styleNode);
    return styleNode;
}