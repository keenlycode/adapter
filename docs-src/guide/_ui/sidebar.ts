import { css } from '@devcapsule/adapter/src/style';
import Color from 'color';

import { aspectRatio, bgColor } from '../../_ux/style';
import { color } from '../../_ux/designToken';
import { Sidebar as _Sidebar } from '../../_ux/ui/sidebar';


const sideBarStyle = css`
    height: 100dvh;
    left: 0;
    ${bgColor(color.dark)}
    @media screen and (min-width: 1200px) {
        filter:
            drop-shadow(2px 2px 4px ${Color(color.dark)
            .alpha(0.8).string()});
    }

    button[el="toggle"] {
        display: flex;
        position: fixed;
        top: 70dvh;
        right: 0;
        width: 3em;
        border-top-left-radius:0 ;
        border-bottom-left-radius: 0;
        transform: translateX(100%);
        opacity: 0.3;
        &:hover { opacity: 1 };
        ${aspectRatio('1')}
        span {
            font-size: 1.5em;
            transition: transform 0.4s ease;
            transform: rotate(0deg);
            /** When screen wider than 1200px */
            @media screen and (min-width: 1200px) {
                transform: rotate(180deg);
            }
        }
    }
`;

class Sidebar extends _Sidebar {
    static css = css`
        ${Sidebar.style()}
        ${Sidebar.style({showAt: 0})}
        ${sideBarStyle}
    `;

    constructor() {
        super();
        this.querySelector('[el="toggle"]')?.addEventListener('click', () => {  
            this.toggle();
        });
        setTimeout(() => {
            Sidebar.addStyle(css`
                ${Sidebar.style({showAt: 1200})}
            `);
        }, 1000);
    }

    show() {
        super.show();
        this.addStyle(css`
            filter:
                drop-shadow(2px 2px 4px ${Color(color.dark)
                .alpha(0.8).string()});
            [el="toggle"] {
                span { transform: rotate(180deg) }
            };
        `);
        this.dispatchEvent(new CustomEvent('show'));
    }

    hide() {
        super.hide();
        this.addStyle(css`
            filter: none;
            [el="toggle"] {
                span { transform: rotate(0deg) }
            };
        `);
        this.dispatchEvent(new CustomEvent('hide'));
    }
}

export { Sidebar };