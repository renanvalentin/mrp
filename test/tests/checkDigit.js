/* @flow */

import { expect } from 'chai';

import { checkDigit } from '../../src/checkDigit';

describe('check digit cases', () => {
    it('should calculate check digit', () => {
        const eita = 'YO213971';

        expect(checkDigit(eita, { start: 1, end: 9 })).to.be.eql(9);
    });
});
