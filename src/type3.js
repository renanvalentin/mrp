/* @flow */

import { countryCodes } from './countryCodes';
import { build } from './instruction';
import { checkDigit, checkMultipleDigits } from './checkDigit';

type Name = {
    firstName : string,
    surname : string,
    lastName : string
};

type Passport = {
    name : Name,
    country : string,
    number : string,
    dateOfBirth : string,
    gender : string,
    expirationDate : string,
    personalNumber : string
};

export const passportSign = () : string => 'P';

export const distinguishTypeForCountries = () : string => '<';

export const issueCountryCode = (country : string) : string => {
    const result = countryCodes.find(c => c.name === country);

    if (!result) {
        throw new Error('Country code not found');
    }

    return result['alpha-3'];
};

export const makeName = (name : Name) => {
    return `${ name.surname }<${ name.lastName }<<${ name.firstName }`;
};

export const formatFirstRow = (passport : Passport) : string => {
    const instructions = [
        { length: 1, transform: () => passportSign() },
        { length: 1, transform: () => distinguishTypeForCountries() },
        { length: 3, transform: () => issueCountryCode(passport.country) },
        { length: 39, transform: () => makeName(passport.name) }
    ];

    return build(instructions);
};

export const passportNumber = (number : string) : string => number;

export const dateOfBirth = (date : string) : string => date;

/* istanbul ignore next */
export const checkPassportDigit = (digits : string) : string => checkDigit(digits, { start: 1, end: 9 }).toString();

/* istanbul ignore next */
export const checkDateOfBirth = (digits : string) : string => checkDigit(digits, { start: 14, end: 19 }).toString();

export const gender = (g : string) : string => g;

export const expirationDate = (date : string) : string => date;

/* istanbul ignore next */
export const checkExpirationDate = (digits : string) : string => checkDigit(digits, { start: 22, end: 27 }).toString();

/* istanbul ignore next */
export const checkPersonalNumber = (digits : string) : string => checkDigit(digits, { start: 29, end: 42 }).toString();

/* istanbul ignore next */
export const validateEntry = (digits : string) : string => checkMultipleDigits(digits, [
    { start: 1, end: 10 },
    { start: 14, end: 20 },
    { start: 22, end: 43 }
]).toString();

export const formatSecondRow = (passport : Passport) : string => {
    /* istanbul ignore next */
    const instructions = [
        { length: 9, transform: () => passportNumber(passport.number) },
        { length: 1, transform: (digits : string) => checkPassportDigit(digits) },
        { length: 3, transform: () => issueCountryCode(passport.country) },
        { length: 6, transform: () => dateOfBirth(passport.dateOfBirth) },
        { length: 1, transform: (digits : string) => checkDateOfBirth(digits) },
        { length: 1, transform: () => gender(passport.gender) },
        { length: 6, transform: () => expirationDate(passport.expirationDate) },
        { length: 1, transform: (digits : string) => checkExpirationDate(digits) },
        { length: 14, transform: () => passport.personalNumber },
        { length: 1, transform: (digits : string) => checkPersonalNumber(digits) },
        { length: 1, transform: (digits : string) => validateEntry(digits) }
    ];

    return build(instructions);
};

export const generate = (passport : Passport) : Array<string> => {
    return [
        formatFirstRow(passport),
        formatSecondRow(passport)
    ];
};
