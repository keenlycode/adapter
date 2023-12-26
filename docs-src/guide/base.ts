/** 3rd Party */
import { css } from '@devcapsule/adapter/src/style';
import Color from 'color';

import { baseStyle } from '../_base.style';
import { pageReload } from '../_base.esbuild'
import { Sidebar } from '../_ux/ui/sidebar';
import { Menu } from '../_ux/ui/menu';
import { bgColor } from '../_ux/style';
import { color } from '../_ux/designToken';
import { baseLib } from '../_base.lib';
import { baseStyle as guideBaseStyle } from './_base.style';

baseLib();
baseStyle('../');
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
    filter:
        drop-shadow(2px 2px 4px ${Color(color.dark)
        .alpha(0.8).string()});
`;

Sidebar.define('el-sidebar');
Sidebar.css = css`
    ${Sidebar.style({showAt: 0})}
    ${sideBarStyle}
`;

setTimeout(() => {
    Sidebar.css = css`
        ${Sidebar.style({showAt: 1200})}
        ${sideBarStyle}
    `;
}, 1000);