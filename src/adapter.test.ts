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
        MyAdapter.styles = MyAdapter.styles.concat({
            class_: '',
            css: 'background-color: red'
        });
        MyAdapter.defineStyle();
        console.log(document.querySelectorAll('style'));
    })
})