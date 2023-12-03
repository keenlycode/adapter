import {
    describe, expect, test
} from '@jest/globals';
import { JSDOM } from 'jsdom';
import { addStyle } from './style.js';

test('addStyle()', () => {
    const dom = new JSDOM(`
        <!DOCTYPE html><html><head></head><body></body></html>
    `);
    const document = dom.window.document;
    const css = `
    body {
        background: black;
    }
    `;
    const styleNode = addStyle(css, document);
    expect(styleNode.textContent === css).toEqual(true);
    expect(document.querySelector('head > style') == styleNode).toEqual(true);
});