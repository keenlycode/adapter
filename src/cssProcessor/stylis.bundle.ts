import {compile, serialize, stringify} from 'stylis';

const stylis = (css: string) => {
    return serialize(compile(css), stringify);
};

export { stylis };