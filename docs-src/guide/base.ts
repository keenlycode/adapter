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
Sidebar.define('el-sidebar');
Sidebar.css = css`
    ${Sidebar.style({showAt: 0})}
    ${bgColor(color.dark)}
    filter:
        drop-shadow(2px 2px 4px ${Color(color.dark)
        .alpha(0.8).string()});
    border-radius: 0 10px 0 0;
    details {
        line-height: 1.7;
    }
`;

// setTimeout(() => {
//     Sidebar.addStyle(css`
//         ${Sidebar.style({showAt: 1000})}
//     `)
// }, 1000);