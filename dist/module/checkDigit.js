var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var listToDic = function listToDic(list) {
    return list.reduce(function (acc, value) {
        return _extends({}, acc, value);
    }, {});
};

var numericScore = function numericScore() {
    return listToDic(Array.from({ length: 10 }, function (value, index) {
        return _defineProperty({}, index, index);
    }));
};

var lettersScore = function lettersScore() {
    return listToDic(Array.from({ length: 'Z'.charCodeAt(0) - 'A'.charCodeAt(0) + 1 }, function (value, index) {
        return _defineProperty({}, String.fromCharCode(65 + index), index + 10);
    }));
};

var computeDigits = function computeDigits(digits) {
    var scores = _extends({}, numericScore(), lettersScore(), {
        '<': 0
    });

    var weight = {
        '0': 7,
        '1': 3,
        '2': 1
    };

    var _digits$reduce = digits.reduce(function (acc, digit) {
        return {
            result: acc.result + scores[digit] * weight[acc.weightIndex],
            weightIndex: (acc.weightIndex + 1) % 3
        };
    }, {
        result: 0,
        weightIndex: 0
    }),
        result = _digits$reduce.result;

    return result;
};

var calculateDigit = function calculateDigit(digits, range) {
    var candidate = range.map(function (r) {
        return digits.split('').slice(r.start - 1, r.end);
    }).reduce(function (result, sliceDigits) {
        return [].concat(_toConsumableArray(result), _toConsumableArray(sliceDigits));
    });

    var result = computeDigits(candidate);

    return parseInt(result % 10, 10);
};

export var checkDigit = function checkDigit(digits, range) {
    return calculateDigit(digits, [range]);
};

export var checkMultipleDigits = function checkMultipleDigits(digits, range) {
    return calculateDigit(digits, range);
};