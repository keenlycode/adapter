import { Menu as _Menu } from '../../_ux/ui/menu';


class Menu extends _Menu {
    static css = /*css*/`
        ${_Menu.style()}
        a {
            width: 100%;
            text-decoration: none;
            color: unset;
        }
        summary {
            h2 {
                font-size: 1.25rem;
                line-height: 2;
                margin: 0;
                padding-left: 0.5rem;
            }
        }
    `;
};

export { Menu };