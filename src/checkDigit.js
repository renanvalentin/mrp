/* @flow */

type DigitRange = {
    start : number,
    end : number
};

const listToDic = list => list.reduce((acc, value) => ({
    ...acc,
    ...value
}), {});

const numericScore = () => listToDic(
    Array.from({ length: 10 }, (value, index) => ({ [index]: index }))
);

const lettersScore = () => listToDic(
    Array.from({ length: ('Z'.charCodeAt(0) - 'A'.charCodeAt(0)) + 1 }, (value, index) => ({
        [String.fromCharCode(65 + index)]: index + 10
    }))
);

const computeDigits = (digits : Array<string>) : number => {
    const scores = {
        ...numericScore(),
        ...lettersScore(),
        '<': 0
    };

    const weight = {
        '0': 7,
        '1': 3,
        '2': 1
    };

    const { result } = digits.reduce((acc, digit) => ({
        result:      acc.result + (scores[digit] * weight[acc.weightIndex]),
        weightIndex: (acc.weightIndex + 1) % 3
    }), {
        result:      0,
        weightIndex: 0
    });

    return result;
};

const calculateDigit = (digits : string, range : Array<DigitRange>) : number => {
    const candidate = range.map(r => digits.split('').slice(r.start - 1, r.end))
        .reduce((result, sliceDigits) => [
            ...result,
            ...sliceDigits
        ]);

    const result = computeDigits(candidate);

    return parseInt(result % 10, 10);
};

export const checkDigit = (digits : string, range : DigitRange) : number => calculateDigit(digits, [ range ]);

export const checkMultipleDigits = (digits : string, range : Array<DigitRange>) : number => calculateDigit(digits, range);
