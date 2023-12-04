import {
    describe,
    expect,
    test,
    beforeEach,
    afterEach
} from '@jest/globals';

import { Adapter, DOMError } from './adapter';

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

        // Redefined customElements must throw DOMError
        try {
            MyAdapter.define('el-adapter');
        } catch (error) {
            if (!(error instanceof DOMError)) {
                throw error
            }
        }
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

        class MyAdapterClass extends Adapter {};
        const class_ = 'red';
        MyAdapterClass.classStyle(class_, css);
        MyAdapterClass.define('el-adapter-class');
        // console.log(MyAdapterClass.styles[MyAdapterClass.styles.length - 1]);
        expect(MyAdapterClass.styles[MyAdapterClass.styles.length - 1])
            .toEqual({class_: 'red', css: 'background-color: red;'})
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

    test('Adapter.classStyle()', () => {
        const css = 'background-color: red;';
        MyAdapter.classStyle('red', css);
        expect(MyAdapter.styles[MyAdapter.styles.length - 1]).toEqual({
            class_: 'red', css: css
        })
        const styleNodes = document.querySelectorAll('style');
        expect(styleNodes[styleNodes.length - 1].textContent)
            .toContain(`el-adapter.red { ${css} }`);
    })

    test('[Adapter Object].addStyle()', () => {
        const css = 'background-color: red;';
        const el = document.createElement('el-adapter') as MyAdapter;
        el.addStyle(css);

        const styleNode = el.querySelector('style')!;
        expect(styleNode.textContent)
            .toContain(`${el.tagName}.${el._id} { ${css} }`);
    })
})