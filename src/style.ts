export function css(
    tstrings: TemplateStringsArray,
    ...args: Array<any>
): string {
    const strs = function* () {
        for (const str of tstrings) {
            yield str;
        }
    }();
    let result: string = '';
    for (const arg of args) {
        result += strs.next().value;
        result += String(arg);
    }
    result += strs.next().value;
    return result.trim();
}