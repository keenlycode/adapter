import { css } from '@devcapsule/adapter';
import { Adapter } from '../adapter';
import { bgColor, pxToRem } from '../style';
import { color } from '../designToken';


interface MenuStyleParam {
    itemCSS?: string;
    itemHoverCSS?: string;
}

function menuStyle(param: MenuStyleParam = {}) {

    return css`
    div[class] {all: unset};
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    width: 100%;

    details, details[class] {
        width: 100%;
        overflow: hidden;
        > div.container {
            display: block;
            box-sizing: border-box;
            border-left: 0.2rem groove;
            border-bottom-left-radius: 0.3rem;
            border-top-left-radius: 0.3rem;
            margin-left: 0.6rem;
            transition: height 0.3s ease;
        }
    }

    /** Item CSS */
    div.container {
        > div:not(:has(details)),
        > div:has(details) summary {
            display: flex;
            box-sizing: border-box;
            padding-left: 0.5rem;
            line-height: 2.5;
            ${param.itemCSS}
        }
    }

    /** Item Hover CSS */
    summary:has(> a), div:has(> a) {
        &:hover {
            ${bgColor(color.light)}
            ${param.itemHoverCSS}
        }
    }

    details > summary > .toggle {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5rem;
        min-width: 3rem;
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
        box-sizing: border-box;
        width: 100%;
        padding-left: 0.5rem;
    }

    a {
        width: 100%;
    }
    `.trim();
}

class Menu extends Adapter {
    static css = menuStyle();
    static style = menuStyle;

    constructor() {
        super();
        this.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (target.tagName.toLowerCase() === 'summary') {
                e.preventDefault();
                return
            };
            if (!target.classList.contains('toggle')) { 
                return;
            };
            e.preventDefault();
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