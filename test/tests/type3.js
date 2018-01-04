/* @flow */

import { expect } from 'chai';

import {
    passportSign,
    distinguishTypeForCountries,
    issueCountryCode,
    makeName,
    passportNumber,
    formatFirstRow,
    dateOfBirth,
    formatSecondRow,
    gender,
    expirationDate
} from '../../src/type3';

describe('type cases', () => {
    const passport = {
        name: {
            firstName: 'Donkey',
            surname:   'Kong',
            lastName:  'Country'
        },
        country:        'Brazil',
        number:         'YO213971',
        dateOfBirth:    '920322',
        gender:         'M',
        expirationDate: '120722',
        personalNumber: '12345678901234'
    };

    describe('format first row', () => {
        it('should indicate passport on the first position', () => {
            expect(passportSign()).to.be.equal('P');
        });

        it('should distinguish between different types of passports', () => {
            expect(distinguishTypeForCountries()).to.be.equal('<');
        });

        it('should issue country or organization', () => {
            expect(issueCountryCode(passport.country)).to.be.equal('BRA');
        });

        it('should place surname, followed by two filler characters, followed by given names', () => {
            expect(makeName(passport.name)).to.be.eql([
                passport.name.surname,
                '<',
                passport.name.lastName,
                '<<',
                passport.name.firstName
            ].join(''));
        });

        it('should format the first row', () => {
            expect(formatFirstRow(passport)).to.be.equal([
                'P',
                '<',
                'BRA',
                passport.name.surname,
                '<',
                passport.name.lastName,
                '<<',
                passport.name.firstName,
                Array.from({ length: 19 }, () => '<').join('')
            ].join(''));
        });
    });

    describe('format second row', () => {
        it('should place passport number', () => {
            expect(passportNumber(passport.number)).to.be.equal(passport.number);
        });

        it('should place the date of birth', () => {
            expect(dateOfBirth(passport.dateOfBirth)).to.be.equal(passport.dateOfBirth);
        });

        it('should place the gender', () => {
            expect(gender(passport.gender)).to.be.equal(passport.gender);
        });

        it('should place the expiratin date', () => {
            expect(expirationDate(passport.expirationDate)).to.be.equal(passport.expirationDate);
        });

        it('should format the second row', () => {
            expect(formatSecondRow(passport)).to.be.equal([
                passport.number,
                '<',
                '9',
                'BRA',
                passport.dateOfBirth,
                '8',
                passport.gender,
                passport.expirationDate,
                '0',
                passport.personalNumber,
                '5',
                '2'
            ].join(''));
        });
    });
});
