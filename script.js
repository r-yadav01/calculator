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
// let decInuse = 0;

function operate(firNum, operator, secNum) {
    let result = null;
    firNum = parseFloat(firNum);
    secNum = parseFloat(secNum);

    if (isNaN(firNum) || isNaN(secNum)) {
        console.log(`firNum: ${firNum}, secNum: ${secNum}, operator: ${operator}`);
        handleClear();
        return "numbers invalid";
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
}

// function removeButtListeners() {

// }

function handleEqual() {
    let screen = document.querySelector('.calc_screen');
    let result = operate(num1, operator, num2);
    if (isNaN(result)) {
        screen.textContent = result;
        // removeButtListeners();
        setTimeout(() => {
            handleClear();
            // addButtListeners();
        }, 2000)
    } else {
        handleClear();
        screen.textContent = result;
    }
}

function handleNumClick(e) {
    let screen = document.querySelector('.calc_screen');
    let butt = e.target.textContent;
    if (operator) {
        num2 += butt;
        screen.textContent = `${num1}${operator}${num2}`;
    }
    else {
        num1 += butt;
        screen.textContent = `${num1}`;
    }
}

function handleClear() {
    num1 = '';
    num2 = '';
    operator = '';
    let screen = document.querySelector('.calc_screen');
    screen.textContent = '';
}

function handleOperClick(e) {
    let screen = document.querySelector('.calc_screen');
    if (operator) {
        num1 = operate(num1, operator, num2);
        screen.textContent = num1;
        if (isNaN(num1)) {
            setTimeout(() => {
                handleClear();
            }, 2000)
        }
    } 
    operator = e.target.textContent;
    num2 = '';
    screen.textContent = `${num1}${operator}`;
}


