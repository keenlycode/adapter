import { Adapter } from '@devcapsule/adapter/src/adapter';
import { css } from '@devcapsule/adapter/src/style';
import { create } from 'domain';

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
        > div.container {
            display: block;
            width: calc(100% - 0.5em);
            box-sizing: border-box;
            border-left: 0.2rem solid;
            margin-left: 0.4em;
            border-bottom-left-radius: 0.4rem;
        }
    }
    details[open] {
        > div.container {
            max-height: 400px;
        }
    }
    `
}

class Menu extends Adapter {
    static css = menuStyle();

    constructor() {
        super();
        for (const el_summary of this.querySelectorAll('summary')) {
            el_summary.addEventListener('click', (e) => {
                e.preventDefault();
                const el_details = el_summary.parentElement!;
                this.menuAnimation(el_details);
            });
        }
    }

    menuAnimation(el_details: HTMLElement, {duration = 300, easing = 'ease'} = {}) {
        function createAnimateObject(
                startHeight: number,
                endHeight: number,
                duration: number,
                easing: string): any[] {
            return [
                [{height: `${startHeight}px`},{height: `${endHeight}px`}],
                { duration: duration, easing: easing }
            ]
        }

        const el_container: HTMLElement = el_details!
            .querySelector('div.container')!;
        const clientHeight = el_container.clientHeight;
        let startHeight = 0;
        let endHeight = clientHeight;
        if (el_details.open) {
            startHeight = clientHeight;
            endHeight = 0;
            const args: any[] = createAnimateObject(startHeight, endHeight, duration, easing);
            el_container.animate(...args).onfinish = () => {
                el_details.open = false;
            }
        } else {
            el_details.open = true;
            const args: any[] = createAnimateObject(startHeight, endHeight, duration, easing);
            el_container.animate(...args);
            // animate(a, b)
            // el_container.animate(
            //     [
            //         {height: `${startHeight}px`},
            //         {height: `${endHeight}px`}
            //     ],
            //     {
            //         duration: 300,
            //         easing: 'ease'
            //     }
            // )
        }
    }
}

export { Menu };