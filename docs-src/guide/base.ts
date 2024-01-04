/** 3rd Party */
import { pageReload } from '../_base.esbuild'
import { Sidebar as _Sidebar } from '../_ux/ui/sidebar';
import { Menu } from './_ui/menu';
import { baseStyle as guideBaseStyle } from './_base.style';

import { Sidebar } from './_ui/sidebar';
import { Container } from './_ui/container';


guideBaseStyle();
pageReload('../');

Menu.define('el-menu');

Sidebar.define('el-sidebar');
Container.define('el-container');