/* @flow */

import { expect } from 'chai';

import {
    build
} from '../../src/instruction';

describe('instruction cases', () => {
    it('should truncate last character from transform instruction', () => {
        const name = {
            firstName: '1234',
            surname:   '5678',
            lastName:  '9012'
        };

        const instruction = {
            length:    14,
            transform:  () => [
                name.surname,
                '<',
                name.lastName,
                '<<',
                name.firstName
            ].join('')
        };

        const instructions = [ instruction ];

        expect(build(instructions)).to.be.eql([
            name.surname,
            '<',
            name.lastName,
            '<<',
            '12<'
        ].join(''));

        expect(build(instructions).length).to.be.equal(instruction.length);
    });
});
