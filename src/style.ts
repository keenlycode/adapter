import {compile, serialize, stringify} from 'stylis';

const css = (strings: any[string], ...values: any[string]) => {
    const raw = String.raw(strings, ...values);
    return serialize(compile(raw), stringify);
};

export { css };