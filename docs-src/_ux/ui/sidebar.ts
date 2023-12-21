import { Adapter } from '@devcapsule/adapter/src/adapter';
import { css } from '@devcapsule/adapter/src/style';

const sidebarStyle = ({show=true} = {}): string => {
    function showCSS(show) {
        let style = css`transition: transform 0.4s ease;`
        if (show) {
            style += css`transform: translateX(0);`;
        } else {
            style += css`transform: translateX(-100%);`;
        }
        return style;
    }

    return css`
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
        position: fixed;
        background-color: grey;
        width: 30ch;
        min-height: 50dvh;
        max-height: 100dvh;
        z-index: 100;
        ${showCSS(show)}
        & h1 {
            font-size: 1.5rem;
        }
    `.trim();
};

class Sidebar extends Adapter {
    static css = sidebarStyle({show: true});
    static style = sidebarStyle;
    
    constructor() {
        super();
        this.innerHTML = '<h1>Sidebar</h1>';
        const mediaQueryList = window.matchMedia('(min-width: 1000px)');
        mediaQueryList.addEventListener('change', (event) => {
            if (event.matches) {
                this.css = Sidebar.style({show: true});
            } else {
                this.css = Sidebar.style({show: false});
            }
        });
    }

    cssFn({show=true} = {}) {
        this.css = Sidebar.style({show: show});
    }
};

export { Sidebar };