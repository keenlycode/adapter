import {
    describe,
    expect,
    test,
    beforeEach,
    afterEach
} from '@jest/globals';

import { Adapter } from './adapter';

class MyAdapter extends Adapter {};

describe('class Adapter {}', () => {
    beforeEach(() => {
        MyAdapter.styles = [{
            class_: '',
            css: 'all: unset;'
        }];
        const styleNodes = document.querySelectorAll('style');
        for (const styleNode of styleNodes) {
            styleNode.remove();
        }
    });

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
        const css = 'background-color: red;';
        MyAdapter.styles = MyAdapter.styles.concat({
            class_: '',
            css: css
        });
        MyAdapter.defineStyle();
        expect(MyAdapter.styles[MyAdapter.styles.length - 1])
            .toEqual({class_: '', css: css});
        const styleNodes = document.querySelectorAll('style[component="MyAdapter"]');
        const lastStyleNode = styleNodes[styleNodes.length - 1];
        expect(lastStyleNode.textContent).toContain(css);
    })
    
    test('Adapter.tagStyle()', () => {
        const css = 'background-color: red;';
        MyAdapter.tagStyle(css);
        expect(MyAdapter.styles[MyAdapter.styles.length - 1]).toEqual({
            class_: '', css: css
        })
        const styleNodes = document.querySelectorAll('style');
        expect(styleNodes[styleNodes.length - 1].textContent).toContain(css);
    });
})