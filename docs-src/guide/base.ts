/** 3rd Party */
import { css } from '@devcapsule/adapter/src/style';

import { pageReload } from '../_base.esbuild'
import { Sidebar as _Sidebar } from '../_ux/ui/sidebar';
import { Menu } from '../_ux/ui/menu';
import { baseStyle as guideBaseStyle } from './_base.style';

import { Sidebar } from './_ui/sidebar';
import { Container } from './_ui/container';


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

Sidebar.define('el-sidebar');
Container.define('el-container');