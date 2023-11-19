import { Adapter, css } from '@devcapsule/adapter/src/export';
import './index.style';

new EventSource('/esbuild').addEventListener(
    'change',
    () => location.reload());

class Particle extends Adapter {
    constructor() {
        super();
    }

    connectedCallback() {
        this.parentElement!.addEventListener('mousemove', (event) => {
            this.onMouseMove(event);
        })
    }

    onMouseMove(event) {
        const mousePoint = [event.clientX, event.clientY];
        const centerPoint = this.getCenterPoint();
        let distance = Math.sqrt(
            Math.pow(mousePoint[0] - centerPoint[0], 2) +
            Math.pow(mousePoint[1] - centerPoint[1], 2)
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
    }

    connectedCallback() {
        const particleScene = document.querySelector('#particle-scene');
        for (let i=0; i<100; i++) {
            const particle = document.createElement('el-particle');
            particleScene!.append(particle);
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
    > h1, h2 {
        text-align: center;
    }
`);

ParticleScene.tagStyle(css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: auto;
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
    background-color: blue;
    border-radius: 100%;
    border: 0.1em solid;
`)

Highlight.define('el-highlight');
Particle.define('el-particle');
ParticleScene.define('id-particle-scene');

window.Particle = Particle;