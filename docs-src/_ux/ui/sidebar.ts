import { Adapter } from '@devcapsule/adapter/src/adapter';
import { css } from '@devcapsule/adapter/src/style';

// function htmlUnsafe(strings, ...values) {
//     return html([String.raw(strings, ...values)]);
// };

interface StyleParam {
    showAt?: number;
}

const sidebarStyle = (param: StyleParam = {}): string => {
    param = {showAt: 0, ...param};
    
    function showAt(breakpoint: number) {
        return css`
            @media (max-width: ${breakpoint}px) {
                transform: translateX(-100%);
                filter: drop-shadow(0 0 0);
                box-shadow: 0 0 0;
            }
        `.trim();
    }

    let style = css`
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        align-content: flex-start;
        box-sizing: border-box;
        position: fixed;
        z-index: 100;
        width: 32ch;
        min-height: 50dvh;
        overflow-y: auto;
        background-color: white;
        transition: transform 0.4s ease;
    `.trim();
    param.showAt ? style += showAt(param.showAt) : null;
    return style;
};

class Sidebar extends Adapter {
    static style = sidebarStyle;
};

export { Sidebar };