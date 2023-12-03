import {
    describe,
    expect,
    test
} from '@jest/globals';

import { Adapter } from './adapter';

class MyAdapter extends Adapter {};

describe('class Adapter {}', () => {
    afterEach(() => {
        // restore the spy created with spyOn
        jest.restoreAllMocks();
    });

    test('Adapter.define()', () => {
        jest.spyOn(MyAdapter, 'defineStyle');
        MyAdapter.define('el-adapter');
        const el = document.createElement('el-adapter');
        expect(el instanceof MyAdapter).toEqual(true);
        expect(MyAdapter.tagName === 'el-adapter').toEqual(true);
    })

    test('Adapter.defineStyle()', () => {
        const css = 'background-color: red;'
        MyAdapter.styles = MyAdapter.styles.concat({
            class_: '',
            css: css
        });
        MyAdapter.defineStyle();
        const styleNodes = document.querySelectorAll('style[component="MyAdapter"]');
        const lastStyleNode = styleNodes[styleNodes.length - 1];
        expect(lastStyleNode.textContent).toContain(css);
    })
})