import { Adapter } from '@devcapsule/adapter/src/adapter';
import { Button } from 'gadjet/src/gadjet';
import { color } from './_ux/designToken';


const css = String.raw;

const __base_url = new URL(import.meta.url);
window.__base_url = __base_url;

class Particle extends Adapter {
    constructor() {
        super();
    }

    connectedCallback() {
        this.parentElement!.addEventListener('mousemove', (event) => {
            this.onMouseMove(event);
        })
        this.parentElement!.addEventListener('touchmove', (event) => {
            this.onTouchMove(event);
        })
    }

    onMouseMove(event) {
        const mousePoint = [event.clientX, event.clientY];
        this.onClientMove(mousePoint);
    }

    onTouchMove(event) {
        const touchPoint = [
            event.touches[0].clientX,
            event.touches[0].clientY
        ];
        this.onClientMove(touchPoint);
    }

    onClientMove(clientPoint) {
        const centerPoint = this.getCenterPoint();
        let distance = Math.sqrt(
            Math.pow(clientPoint[0] - centerPoint[0], 2) +
            Math.pow(clientPoint[1] - centerPoint[1], 2)
        )
        if (distance > 400) { return };
        if (distance > 100) {
            this.style.scale = "1";
            return;
        };
        const scale = (Math.abs(distance / 100 - 1) * 3) + 1;
        this.style.scale  = scale.toString();
    }

    getCenterPoint() {
        const rect = this.getBoundingClientRect();
        const point = [
            (rect.left + rect.right)/2,
            (rect.top + rect.bottom)/2
        ];
        return point;
    }
}

class ParticleScene extends Adapter {
    constructor() {
        super();
        this.addEventListener('mouseout', () => {
            this.resetScene();
        })
    }

    connectedCallback() {
        for (let i=0; i<100; i++) {
            const particle = document.createElement(`el-particle`);
            this.append(particle);
        }
    }

    resetScene() {
        const particles = this.querySelectorAll('el-particle');
        for (const particle of particles) {
            (particle as HTMLElement).style.scale = '1';
        }
    }
};

class Heading extends Adapter {};

class HeadingButtons extends Adapter {};

Heading.addStyle(css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    & h1, h2 {
        text-align: center;
    }
    & h1 {
        margin-top: 2rem;
    }
    & h2 {
        margin-top: 1.5rem;
    }
`);

HeadingButtons.addStyle(css`
    & button {
        margin: 0 1rem;
        & el-icon {
            margin-right: 0.5rem;
        }
    }
    & button[el="guide"] {
        ${Button.Style.style({color: color.blue})}
    }
    & button[el="github"] {
        ${Button.Style.style({color: color.dark})}
    }
    & button[el="discord"] {
        ${Button.Style.style({color: color.light})}
    }
`);

ParticleScene.addStyle(css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: auto;
    margin-top: 2rem;
    max-width: 400px;
    min-width: 300px;
`)

Particle.addStyle(css`
    display: inline-flex;
    box-sizing: border-box;
    margin: 3.5%;
    width: 3%;
    height: auto;
    aspect-ratio: 1;
    background-color: orange;
    border-radius: 100%;
    border: 0.2em solid red;
`)

Heading.define('el-heading');
HeadingButtons.define('el-social-buttons');
Particle.define('el-particle');
ParticleScene.define('el-particle-scene');

window.Adapter = Adapter;
window.Particle = Particle;
window.css = css;