import {compile, serialize, stringify} from 'stylis';

export const stylis = (css: string) => {
    return serialize(compile(css), stringify);
};