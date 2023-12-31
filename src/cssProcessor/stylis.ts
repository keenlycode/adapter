import {compile, serialize, stringify} from 'stylis';

export const stylis = (css) => {
    return serialize(compile(css), stringify);
};