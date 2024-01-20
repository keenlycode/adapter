import { Menu as _Menu } from '../../_ux/ui/menu';


class Menu extends _Menu {
    static css = /*css*/`
        ${_Menu.style()}
        height: 25rem;
        overflow-y: auto;
        padding-top: 1rem;
        padding-bottom: 2rem;
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