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
// let operInuse = 0;
// let decInuse = 0;

function operate(firNum, operator, secNum) {
    let result = null;
    firNum = parseFloat(firNum);
    secNum = parseFloat(secNum);

    if (isNaN(firNum) || isNaN(secNum)) {
        console.log(`firNum: ${firNum}, secNum: ${secNum}, operator: ${operator}`);
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
            if (secNum === 0) {
                result = "don't do it!";
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
    buttListeners();
})

function buttListeners() {
    let screen = document.querySelector('.calc_screen');

    let clear = document.querySelector('.clear');
    clear.addEventListener('click', () => {
        handleClear();
        screen.textContent = '';
    })

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
    equal.addEventListener('click', () => {
        let result = operate(num1, operator, num2);
        screen.textContent = result;
        handleClear();
    })

}

// number is clicked
function handleNumClick(e) {
    let butt = e.target.textContent;
    if (operator) {
        num2 += butt;
    }
    else {
        num1 += butt;
    }
}

function handleClear() {
    num1 = '';
    num2 = '';
    operator = '';
}

function handleOperClick(e) {
    operator = e.target.textContent;
}

