import {
    describe, expect, test
} from '@jest/globals';

import {css} from './style';

test('css tag should return correct trimmed css string '
        + 'compare to template literal', () => {
    const borderStyle = 'solid';
    const borderColor = '#fff';
    const text = `border: 1px ${borderStyle} ${borderColor};`;
    const style = css`
        border: 1px ${borderStyle} ${borderColor};
    `;
    
    expect(text).toEqual(style);
});