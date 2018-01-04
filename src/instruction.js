/* @flow */

type Instruction = {
    length : number,
    transform : (digits : string) => string
};

const truncate = (text, size) : string => {
    const end = '<';
    return text.substring(0, size - end.length) + end;
};

const fillFillers = (text, size) : string => {
    const fillIn = Array.from({ length: size - text.length }, () => '<');
    
    return text.split('').concat(fillIn).join('');
};

const process = (instruction : Instruction, digits : string) => {
    const result = instruction.transform(digits);
    
    if (result.length > instruction.length) {
        return truncate(result, instruction.length);
    } else if (result.length < instruction.length) {
        return fillFillers(result, instruction.length);
    }
    
    return result;
};

export const build = (instructions : Array<Instruction>) : string => {
    return instructions.reduce((digits, instruction) => {
        return digits + process(instruction, digits);
    }, '');
};
