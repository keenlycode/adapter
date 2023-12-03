import {
    describe, expect, test
} from '@jest/globals';
import { JSDOM } from 'jsdom';
import { addStyle } from './style.js';

test('addStyle()', () => {
    const DOM = new JSDOM(`
        <!DOCTYPE html><html><head></head><body></body></html>
    `)
    console.log(DOM);
});