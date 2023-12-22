import Color from "color";
import { css } from '@devcapsule/adapter/src/style';

function bgColor(color) {
    return css`
        background-color: ${color};
        color: ${Color(color).isDark() ? 'white' : 'black'};
    `.trim();
}

function lift(level: number, color: string = 'black') {
    return `filter: drop-shadow(0 0 ${level * 2}px ${color});`;
}

export { bgColor, lift };