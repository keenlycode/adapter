import Color from "color";

const css = String.raw;

function bgColor(color) {
    return css`
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
    return css`
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

interface FontFluidParam {
    vwMin?: number,
    vwMax?: number,
    fontSizeMin?: number,
    fontSizeMax?: number
}

function fontFluid({
    vwMin = 300, vwMax = 1200,
    fontSizeMin = 16, fontSizeMax = 18
}: FontFluidParam = {}): string {
    let viewportRatio = `(100vw - ${vwMin}px) / (${vwMax} - ${vwMin})`;
    let fontScaleRatio = `(${fontSizeMax} - ${fontSizeMin}) * ${viewportRatio}`;
    return css`
        font-size: ${fontSizeMin}px;
        @media screen and (min-width: ${vwMin}px) {
            font-size: calc(
                ${fontSizeMin}px + ${fontScaleRatio}
            );
        }
        @media screen and (min-width: ${vwMax}px) {
            font-size: ${fontSizeMax}px;
        }
    `.trim();
}

export {
    bgColor,
    lift,
    pxToRem,
    aspectRatio,
    fontFluid
};