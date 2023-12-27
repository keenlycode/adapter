/** 3rd Party */
import { css } from '@devcapsule/adapter/src/style';
import Color from 'color';

import { pageReload } from '../_base.esbuild'
import { aspectRatio, bgColor } from '../_ux/style';
import { color } from '../_ux/designToken';
import { Sidebar as _Sidebar } from '../_ux/ui/sidebar';
import { Menu } from '../_ux/ui/menu';
import { baseStyle as guideBaseStyle } from './_base.style';


guideBaseStyle();
pageReload('../');

Menu.define('el-menu');
Menu.css = css`
    ${Menu.style()}
    a {
        text-decoration: none;
        color: unset;
    }
    summary {
        h2 {
            line-height: 2;
            margin: 0;
            padding-left: 0.5rem;
        }
    }
`;

const sideBarStyle = css`
    height: 100dvh;
    ${bgColor(color.dark)}
    @media screen and (min-width: 1200px) {
        filter:
            drop-shadow(2px 2px 4px ${Color(color.dark)
            .alpha(0.8).string()});
    }

    button[el="toggle"] {
        display: flex;
        position: fixed;
        top: 50dvh;
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
    }

    hide() {
        super.hide();
        this.addStyle(css`
            filter: none;
            [el="toggle"] {
                span { transform: rotate(0deg) }
            };
        `);
    }
}

Sidebar.define('el-sidebar');
