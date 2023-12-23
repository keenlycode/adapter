import { Adapter } from '@devcapsule/adapter/src/adapter';
import { css } from '@devcapsule/adapter/src/style';

function pxToRem(px: any) {
    px = parseFloat(px);
    const rem1 = parseFloat(getComputedStyle(document.documentElement).fontSize);
    return `${px / rem1}rem`;
}

function menuStyle() {
    return css`
    display: flex;
    align-items: flex-start;
    width: 100%;
    details {
        width: 100%;
        cursor: pointer;
        overflow: hidden;
    }
    summary {
        display: flex;
        justify-content: flex-start;
        outline: none;
        list-style: none outside;
    }
    details {
        div.container {
            display: block;
            box-sizing: border-box;
            border-left: 0.2rem groove;
            margin-left: 0.5rem;
            width: calc(100% - 0.5rem);
            border-bottom-left-radius: 0.3rem;
            border-top-left-radius: 0.3rem;
            transition: height 0.3s ease;
        }
    }
    `
}

class Menu extends Adapter {
    static css = menuStyle();
    static style = menuStyle;

    constructor() {
        super();
        this.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            let el_details = target.closest(`${this.tagName} summary`) as HTMLDetailsElement;

            if (!el_details) {return};
            el_details = el_details.parentElement as HTMLDetailsElement;

            const el_container :HTMLElement = el_details
                .parentElement!
                .closest(`${this.tagName} div.container`)! as HTMLElement;

            e.preventDefault();
            el_container ? el_container.style.height = "auto" : null;
            el_details.open ? this.close(el_details) : this.open(el_details);
        });
    }

    open(el_details: HTMLDetailsElement) {
        const el_container: HTMLElement = el_details.querySelector('div.container')!;
        const height = pxToRem(getComputedStyle(el_container).height);

        let parentDetails = el_details
            .parentElement!
            .closest(`${this.tagName} details`) as HTMLDetailsElement;
        while (parentDetails) {
            parentDetails.open ? null : this.open(parentDetails);
            parentDetails = parentDetails
                .parentElement!
                .closest('details') as HTMLDetailsElement;
        }

        el_details.open = true;
        el_container.style.height = "0";
        setTimeout(() => {
            el_container.style.height = height;
        }, 0);
    }

    close(el_details: HTMLDetailsElement) {
        const el_container: HTMLElement = el_details.querySelector('div.container')!;
        el_container.style.height = pxToRem(getComputedStyle(el_container).height);
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