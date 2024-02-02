import { Adapter } from './lib/lib.export.bundle.js';
import {
    buttonStyle,
    color
} from './ux.bundle.js';


const css = String.raw;

class Particle extends Adapter {
    static css = css`
        display: inline-flex;
        box-sizing: border-box;
        margin: 3.5%;
        width: 3%;
        height: auto;
        aspect-ratio: 1;
        background-color: orange;
        border-radius: 100%;
        border: 0.2em solid red;
    `
    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
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
    static css = css`
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        margin: auto;
        margin-top: 2rem;
        max-width: 400px;
        min-width: 300px;
    `

    constructor() {
        super();
        this.addEventListener('mouseout', () => {
            this.resetScene();
        })
    }

    connectedCallback() {
        super.connectedCallback();
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

class Heading extends Adapter {
    static css = css`
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        text-align: center;
        & h1 {
            margin-top: 2rem;
        }
        & h2, h3 {
            margin-top: 1.5rem;
        }
    `
};

class HeadingButtons extends Adapter {
    static css = css`
        el-button {
            margin: 1rem 1rem;
            & el-icon {
                margin-right: 0.5rem;
            }
        }
        el-button[el="github"] {
            ${buttonStyle(color.dark)}
        }
        el-button[el="discord"] {
            ${buttonStyle(color.light)}
        }
    `
};


Heading.define('el-heading');
HeadingButtons.define('el-heading-buttons');
Particle.define('el-particle');
ParticleScene.define('el-particle-scene');

window.Adapter = Adapter;
window.Particle = Particle;