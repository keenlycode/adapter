import { Adapter } from '@devcapsule/adapter/src/adapter';
import { css } from '@devcapsule/adapter/src/style';
import { bgColor } from '../style';
import { render, html } from 'uhtml';

function htmlUnsafe(strings, ...values) {
    return html([String.raw(strings, ...values)]);
};

interface StyleParam {
    showAt?: number;
    side?: 'left' | 'right';
}

const sidebarStyle = (param: StyleParam = {}): string => {
    param = {...{showAt: 0, side: 'left'}, ...param};
    
    function showAt(breakpoint: number) {
        return css`
            @media (max-width: ${breakpoint}px) {
                transform: translateX(-100%);
            }
        `.trim();
    }

    return css`
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
        position: fixed;
        bottom: 0;
        width: 32ch;
        min-height: 70dvh;
        max-height: 70dvh;
        z-index: 100;
        transition: transform 0.4s ease;
        ${bgColor('white')};
        ${showAt(param.showAt!)}
    `.trim();
};

class Sidebar extends Adapter {
    static style = sidebarStyle;
    
    constructor() {
        super();
        this.render();
    }

    cssFn(param: StyleParam = {}) {
        param = {...{show: true, showAt: 0}, ...param};
        this.css = Sidebar.style(param);
    }

    render() {
        render(this, htmlUnsafe`
            ${this.innerHTML}
        `)
    }
};

export { Sidebar };