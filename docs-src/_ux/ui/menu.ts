import { Adapter } from '@devcapsule/adapter/src/adapter';
import { css } from '@devcapsule/adapter/src/style';

function menuStyle() {
    return css`
    display: flex;
    align-items: flex-start;
    width: 100%;
    details{
        width: 100%;
        cursor: pointer;
    }
    details summary {
        outline: none;
        list-style: none;
    }
    details {
        > div {
            display: block;
            box-sizing: border-box;
            border-left: 0.3em solid;
            padding-left: 0.5em;
            &:last-of-type {
                border-bottom-left-radius: 0.4em;
            }
        }
    }
    `
}

class Menu extends Adapter {
    static css = menuStyle();
}

export { Menu };