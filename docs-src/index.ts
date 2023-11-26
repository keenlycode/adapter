// import { Adapter, css } from 'http://localhost:8000/lib/adapter/bundle/adapter.js';
import { Adapter, css, addStyle } from '@devcapsule/adapter';
import { Button } from 'gadjet/src/gadjet';
import { palette } from './_ux/color';


Button.define('button');

addStyle(css`
button[el="github"] {
    margin: auto;
    ${Button.tagStyle({
        color: palette.dark
    })}
}
`)


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
            particle.style.scale = 1;
        }
    }
};

class Highlight extends Adapter {
    constructor() {
        super();
    }
};

Highlight.tagStyle(css`
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

ParticleScene.tagStyle(css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: auto;
    margin-top: 2rem;
    max-width: 400px;
    min-width: 300px;
`)

Particle.tagStyle(css`
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

Highlight.define('el-highlight');
Particle.define('el-particle');
ParticleScene.define('el-particle-scene');

window.Particle = Particle;
window.css = css;