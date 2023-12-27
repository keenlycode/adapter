import { Adapter } from '@devcapsule/adapter/src/adapter';
import { css } from '@devcapsule/adapter/src/style';

interface StyleParam {
    showAt?: number;
}

const sidebarStyle = (inputParam: StyleParam = {}): string => {
    const param = {showAt: 0, ...inputParam};
    
    function showAt(breakpoint: number) {
        return css`
            @media (max-width: ${breakpoint}px) {
                transform: translateX(-100%);
            }
        `.trim();
    }

    let style = ``;
    param.showAt ? style += showAt(param.showAt) : null;
    if (Object.keys(inputParam).length !== 0) { return style };

    style += css`
        all: unset;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        align-content: flex-start;
        box-sizing: border-box;
        position: fixed;
        z-index: 100;
        width: 28ch;
        min-height: 50dvh;
        padding-top: 30dvh;
        padding-bottom: 20dvh;
        background-color: white;
        transition: transform 0.4s ease;
        transform: translateX(0);
    `.trim();
    return style;
};

class Sidebar extends Adapter {
    static css = `${sidebarStyle()}`;
    static style = sidebarStyle;

    constructor() {
        super();
    }

    show() {
        this.addStyle(css`
            transform: translateX(0);
        `)
    }

    hide() {
        this.addStyle(css`
            transform: translateX(-100%);
        `)
    }

    toggle() {
        getComputedStyle(this).transform === 'matrix(1, 0, 0, 1, 0, 0)' ?
            this.hide() : this.show();
    }
};

export { Sidebar };