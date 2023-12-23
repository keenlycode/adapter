import { baseStyle } from '../_base.style';
import { pageReload } from '../_base.esbuild'
import { Sidebar } from '../_ux/ui/sidebar';
import { Menu } from '../_ux/ui/menu';
import { css } from '@devcapsule/adapter/src/style';
import { bgColor } from '../_ux/style';
import { color } from '../_ux/designToken';
import Color from 'color';

baseStyle('../');
pageReload('../');

Menu.define('el-menu');
Menu.css = css`
    ${Menu.style()}
    summary {
        line-height: 2.5;
    }
    .item {
        line-height: 2.5;
    }
    .item:not(:has(details)) {
        padding-left: 0.5rem;
    }
    .item:hover:not(:has(details)) {
        ${bgColor(color.light)}
        padding-left: 0.5rem;
    }
    .item:has(details) summary {
        padding-left: 0.5rem;
    }
    .item:has(details) summary:hover{
        ${bgColor(color.light)}
    }
`;

Sidebar.define('el-sidebar');
Sidebar.css = css`
    ${Sidebar.style({showAt: 0})}
    height: 100dvh;
    ${bgColor(color.dark)}
    filter:
        drop-shadow(2px 2px 4px ${Color(color.dark)
        .alpha(0.8).string()});
`;

// setTimeout(() => {
//     Sidebar.addStyle(css`
//         ${Sidebar.style({showAt: 1000, bgColor: color.dark})}
//     `)
// }, 1000);