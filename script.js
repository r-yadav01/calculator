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

let num1 = '';
let num2 = '';
let operator;
const operators = ['+', '-', '*', '/'];
let operUsed = false;
let deci1Used = false;
let deci2Used = false;


function operate(firNum, operator, secNum) {
    let result = null;
    firNum = parseFloat(firNum);
    secNum = parseFloat(secNum);

    if (isNaN(firNum) || isNaN(secNum)) {
        console.log(`firNum: ${firNum}, secNum: ${secNum}, operator: ${operator}`);
        handleClear();
        return "operands invalid";
    }

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
            if (secNum == 0) {
                result = "don't do it!";
                handleClear();
            } else {
                result = divide(firNum, secNum);
            }
            break;
        default:
            result = "operator invalid";
            break;
    }
    return result;
}

document.addEventListener('DOMContentLoaded', () => {
    addButtListeners();
})

function addButtListeners() {

    let clear = document.querySelector('.clear');
    clear.addEventListener('click', () => {
        handleClear();
    }, true);

    let numButts = document.querySelectorAll('.num');
    numButts.forEach(numButt => {
        numButt.addEventListener('click', handleNumClick, true);
    })

    let operat = document.querySelectorAll('.operator');
    operat.forEach(oper => {
        oper.addEventListener('click', (e) => {
            handleOperClick(e);
        })
    })

    let equal = document.querySelector('.equals');
    equal.addEventListener('click', handleEqual, true);

    let decimal = document.querySelector('.decimal');
    decimal.addEventListener('click', handleDecimal, true);
}

function handleEqual() {
    let result = operate(num1, operator, num2);
    if (isNaN(result)) {
        printScreen(result);
        setTimeout(() => {
            handleClear();
        }, 2000)
    } else {
        handleClear();
        printScreen(result);
    }
}

function handleNumClick(e) {
    let butt = e.target.textContent;
    if (operator) {
        num2 += butt;
        printScreen(num1, operator, num2);
    }
    else {
        num1 += butt;
        printScreen(num1);
    }
}

function handleClear() {
    num1 = '';
    num2 = '';
    operator = '';
    printScreen();
    deci1Used = false;
    deci2Used = false;
}

function handleOperClick(e) {
    if (operator) {
        num1 = operate(num1, operator, num2);
        printScreen(num1)
        if (isNaN(num1)) {
            setTimeout(() => {
                handleClear();
            }, 2000)
        }
    } 
    operator = e.target.textContent;
    deci1Used = false;
    deci2Used = false;
    num2 = '';
    printScreen(num1, operator);
}

function handleDecimal(e) {
    let butt = e.target.textContent;

    if (operator && !deci2Used) {
        num2 += butt;
        printScreen(num1, operator, num2);
        deci2Used = true;
    }
    else if (!operator && !deci1Used) {
        num1 += butt;
        printScreen(num1);
        deci1Used = true;
    }
}

function printScreen(oper1='', symbol='', oper2='') {
    let screen = document.querySelector('.calc_screen');
    screen.textContent = `${oper1}${symbol}${oper2}`;
}