function add(first=0, second=0) {
    return (first + second);
}

function subtract(first=0, second=0) {
    return (first - second);
}

function multiply(first, second) {
    return (first * second);
}

function divide(first, second) {
    return (first / second);
}

let firNum;
let secNum;
let operator;

function operate() {
    let result;
    switch (operator) {
        case '+':
            result = add(firNum, secNum);
            break;
        case '-':
            result = subtract(firNum, secNum);
            break;
        case '*':
            result = multiply(firNum, secNum);
            break;
        case '/':
            result = divide(firNum, secNum);
            break;
    }
    return result;
}
