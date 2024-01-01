import { css } from '@devcapsule/adapter';
import { Menu as _Menu } from '../../_ux/ui/menu';


class Menu extends _Menu {
    static css = css`a { width: 100% }`;
};

export { Menu };