import Color from "color";

function bgColor(color) {
    return /*css*/`
        background-color: ${color};
        color: ${Color(color).isDark() ? 'white' : 'black'};
    `.trim();
}

function lift(level: number, color: string = 'black') {
    return `filter: drop-shadow(0 0 ${level * 2}px ${color});`;
}

function pxToRem(px: any) {
    px = parseFloat(px);
    const rem1 = parseFloat(
        getComputedStyle(document.documentElement).fontSize);
    return `${px / rem1}rem`;
}

const aspectRatio = (ratio: string = '1/1'): string => {
    return `
    height: auto;
    aspect-ratio: ${ratio};
    @supports not (aspect-ratio: ${ratio}) {
        &::before {
            float: left;
            padding-top: 100% / ${ratio};
            content: "";
        }

        &::after {
            display: block;
            content: "";
            clear: both;
        }
    }
    `.trim();
}

export { bgColor, lift, pxToRem, aspectRatio };