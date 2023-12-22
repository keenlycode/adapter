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
        overflow: hidden;
    }
    details summary {
        outline: none;
        list-style: none;
        > * {
            display: inline-block;
        }
    }
    details {
        div.container {
            display: block;
            width: calc(100% - 0.5em);
            box-sizing: border-box;
            border-left: 0.2rem solid;
            margin-left: 0.4em;
            border-bottom-left-radius: 0.4rem;
            transition: height 0.3s ease;
        }
    }
    `
}

class Menu extends Adapter {
    static css = menuStyle();

    constructor() {
        super();
        this.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            const el_details = target
                .closest(`${this.tagName} summary`)!
                .parentElement as HTMLDetailsElement;
            e.preventDefault();
            const el_container :HTMLElement = el_details
                .parentElement!
                .closest(`${this.tagName} div.container`)! as HTMLElement;
            el_container ? el_container.style.height = "auto" : null;
            el_details.open ? this.close(el_details) : this.open(el_details);
        });
    }

    open(el_details: HTMLDetailsElement) {
        el_details.open = true;
        const el_container: HTMLElement = el_details.querySelector('div.container')!;
        const height = getComputedStyle(el_container).height;
        el_container.style.height = "0";
        setTimeout(() => {
            el_container.style.height = height;
        }, 0);
    }

    close(el_details: HTMLDetailsElement) {
        const el_container: HTMLElement = el_details.querySelector('div.container')!;
        el_container.style.height = getComputedStyle(el_container).height;
        setTimeout(() => {
            el_container.style.height = "0";
        }, 0);
        setTimeout(() => {
            el_details.open = false;
            el_container.style.height = "auto";
        }, 300);
    }
}

export { Menu };