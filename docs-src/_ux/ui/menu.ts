import { Adapter } from '@devcapsule/adapter/src/adapter';
import { css } from '@devcapsule/adapter/src/style';
import { bgColor, pxToRem } from '../style';
import { color } from '../designToken';
import { Color } from 'color';


interface MenuStyleParam {
    itemCSS?: string;
    itemHoverCSS?: string;
}

function menuStyle(param: MenuStyleParam = {}) {
    param = {
        itemCSS: css`
            padding-left: 0.5rem;
            width: calc(100% - 0.5rem);
        `,
        itemHoverCSS: css`${bgColor(color.light)}`,
        ...param
    }

    return css`
    display: flex;
    align-items: flex-start;
    width: 100%;

    details {
        width: 100%;
        overflow: hidden;
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

    details > summary > .toggle {
        cursor: pointer;
        user-select: none;
        outline: none;
        -webkit-tap-highlight-color: transparent;
        transition: transform 0.3s ease;
        transform: rotate(0deg)
    }
    details.open > summary > .toggle {
        transition: transform 0.3s ease;
        transform: rotate(90deg);
    }

    summary {
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    /** Item styles */
    .item:not(:has(details)),
    .item:has(details) summary  {
        cursor: pointer;
        ${param.itemCSS}
    }

    /** Item on hover styles */
    .item:hover:not(:has(details)),
    .item:has(details) summary:hover {
        ${param.itemHoverCSS}
    }
    `.trim();
}

class Menu extends Adapter {
    static css = menuStyle();
    static style = menuStyle;

    constructor() {
        super();
        this.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target as HTMLElement;
            if (!target.classList.contains('toggle')) { 
                return;
            };
            let el_details = target.closest(`${this.tagName} summary`) as HTMLDetailsElement;

            if (!el_details) {return};
            el_details = el_details.parentElement as HTMLDetailsElement;
            el_details.open ? this.close(el_details) : this.open(el_details);
        });
    }

    open(el_details?: HTMLDetailsElement) {
        if (!el_details) {
            el_details = this.querySelector('details') as HTMLDetailsElement;
        };
        el_details.classList.add('open');
        const el_parentContainer :HTMLElement = el_details
                .parentElement!
                .closest(`${this.tagName} div.container`)! as HTMLElement;
        el_parentContainer ? el_parentContainer.style.height = "auto" : null;

        const el_container: HTMLElement = el_details
            .querySelector('div.container') as HTMLElement;

        const height = pxToRem(getComputedStyle(el_container).height);

        let parentDetailsElement = el_details
            .parentElement!
            .closest(`${this.tagName} details`) as HTMLDetailsElement;
        while (parentDetailsElement) {
            parentDetailsElement.open ? null : this.open(parentDetailsElement);
            parentDetailsElement = parentDetailsElement
                .parentElement!
                .closest('details') as HTMLDetailsElement;
        }

        el_details.open = true;
        el_container.style.height = "0";
        setTimeout(() => {
            el_container.style.height = height;
        }, 0);
        return this;
    }

    expand(el_details: HTMLDetailsElement) {
        let childDetailsElement = el_details
            .querySelector('details') as HTMLDetailsElement;
        while (childDetailsElement) {
            this.open(childDetailsElement);
            childDetailsElement = childDetailsElement
                .querySelector('details') as HTMLDetailsElement;
        }
    }

    close(el_details: HTMLDetailsElement) {
        el_details.classList.remove('open');
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

    collapse(el_details: HTMLDetailsElement) {
        this.close(el_details);
        let childDetailsElement = el_details
            .querySelector('details') as HTMLDetailsElement;
        while (childDetailsElement) {
            this.close(childDetailsElement);
            childDetailsElement = childDetailsElement
                .querySelector('details') as HTMLDetailsElement;
        }
    }
}

export { Menu };