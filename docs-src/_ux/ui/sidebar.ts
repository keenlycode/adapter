import { Adapter } from '@devcapsule/adapter/src/export';
import {compile, serialize, stringify} from 'stylis';

const css = (strings, ...values) => {
    const raw = String.raw(strings, ...values);
    return serialize(compile(raw), stringify);
};

class Sidebar extends Adapter {
    static css = css`
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
        position: fixed;
        background-color: grey;
        min-width: 250px;
        min-height: 50dvh;
        transform: translateX(-100%);
    `
};

export { Sidebar };