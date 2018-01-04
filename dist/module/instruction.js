

var truncate = function truncate(text, size) {
    var end = '<';
    return text.substring(0, size - end.length) + end;
};

var fillFillers = function fillFillers(text, size) {
    var fillIn = Array.from({ length: size - text.length }, function () {
        return '<';
    });

    return text.split('').concat(fillIn).join('');
};

var process = function process(instruction, digits) {
    var result = instruction.transform(digits);

    if (result.length > instruction.length) {
        return truncate(result, instruction.length);
    } else if (result.length < instruction.length) {
        return fillFillers(result, instruction.length);
    }

    return result;
};

export var build = function build(instructions) {
    return instructions.reduce(function (digits, instruction) {
        return digits + process(instruction, digits);
    }, '');
};