import { countryCodes } from './countryCodes';
import { build } from './instruction';
import { checkDigit, checkMultipleDigits } from './checkDigit';

export var passportSign = function passportSign() {
    return 'P';
};

export var distinguishTypeForCountries = function distinguishTypeForCountries() {
    return '<';
};

export var issueCountryCode = function issueCountryCode(country) {
    var result = countryCodes.find(function (c) {
        return c.name === country;
    });

    if (!result) {
        throw new Error('Country code not found');
    }

    return result['alpha-3'];
};

export var makeName = function makeName(name) {
    return name.surname + '<' + name.lastName + '<<' + name.firstName;
};

export var formatFirstRow = function formatFirstRow(passport) {
    var instructions = [{ length: 1, transform: function transform() {
            return passportSign();
        } }, { length: 1, transform: function transform() {
            return distinguishTypeForCountries();
        } }, { length: 3, transform: function transform() {
            return issueCountryCode(passport.country);
        } }, { length: 39, transform: function transform() {
            return makeName(passport.name);
        } }];

    return build(instructions);
};

export var passportNumber = function passportNumber(number) {
    return number;
};

export var dateOfBirth = function dateOfBirth(date) {
    return date;
};

/* istanbul ignore next */
export var checkPassportDigit = function checkPassportDigit(digits) {
    return checkDigit(digits, { start: 1, end: 9 }).toString();
};

/* istanbul ignore next */
export var checkDateOfBirth = function checkDateOfBirth(digits) {
    return checkDigit(digits, { start: 14, end: 19 }).toString();
};

export var gender = function gender(g) {
    return g;
};

export var expirationDate = function expirationDate(date) {
    return date;
};

/* istanbul ignore next */
export var checkExpirationDate = function checkExpirationDate(digits) {
    return checkDigit(digits, { start: 22, end: 27 }).toString();
};

/* istanbul ignore next */
export var checkPersonalNumber = function checkPersonalNumber(digits) {
    return checkDigit(digits, { start: 29, end: 42 }).toString();
};

/* istanbul ignore next */
export var validateEntry = function validateEntry(digits) {
    return checkMultipleDigits(digits, [{ start: 1, end: 10 }, { start: 14, end: 20 }, { start: 22, end: 43 }]).toString();
};

export var formatSecondRow = function formatSecondRow(passport) {
    /* istanbul ignore next */
    var instructions = [{ length: 9, transform: function transform() {
            return passportNumber(passport.number);
        } }, { length: 1, transform: function transform(digits) {
            return checkPassportDigit(digits);
        } }, { length: 3, transform: function transform() {
            return issueCountryCode(passport.country);
        } }, { length: 6, transform: function transform() {
            return dateOfBirth(passport.dateOfBirth);
        } }, { length: 1, transform: function transform(digits) {
            return checkDateOfBirth(digits);
        } }, { length: 1, transform: function transform() {
            return gender(passport.gender);
        } }, { length: 6, transform: function transform() {
            return expirationDate(passport.expirationDate);
        } }, { length: 1, transform: function transform(digits) {
            return checkExpirationDate(digits);
        } }, { length: 14, transform: function transform() {
            return passport.personalNumber;
        } }, { length: 1, transform: function transform(digits) {
            return checkPersonalNumber(digits);
        } }, { length: 1, transform: function transform(digits) {
            return validateEntry(digits);
        } }];

    return build(instructions);
};

export var generate = function generate(passport) {
    return [formatFirstRow(passport), formatSecondRow(passport)];
};