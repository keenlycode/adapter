import {
    expect,
    test
} from '@jest/globals';

import { 
    _addStyle,
    addStyle
} from './style.js';

test('_addStyle()', () => {
    const css = `
    body {
        background: black;
    }
    `;
    const styleNode = document.createElement('style');
    _addStyle(styleNode, css, document.head);
    expect(styleNode.textContent === css).toEqual(true);
    expect(document.head.querySelector('style') == styleNode)
        .toEqual(true);
});

test('addStyle()', () => {
    const css = `
    body {
        background: black;
    }
    `;
    const styleNode = addStyle(css);
    styleNode.id = 'test_addStyle'
    expect(styleNode.textContent === css).toEqual(true);
    expect(document.head.querySelector('style#test_addStyle') == styleNode)
        .toEqual(true);
});