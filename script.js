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

    // for idiots testing all edge cases
    if (firNum === '.') firNum = '0';
    if (secNum === '.') secNum = '0';

    firNum = parseFloat(firNum);
    secNum = parseFloat(secNum);

    if (isNaN(firNum) || isNaN(secNum)) {
        // console.log(`firNum: ${firNum}, secNum: ${secNum}, operator: ${operator}`);
        handleClear();
        return "operands_err";
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
                result = "Plz don't!";
                handleClear();
            } else {
                result = divide(firNum, secNum);
            }
            break;
        default:
            result = "operator_err";
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
        }, 1000)
    } else {
        handleClear();
        printScreen(result);
    }
}

function handleNumClick(e) {
    let butt = e.target.textContent;
    if (operator && num2.length < 12) {
        num2 += butt;
        printScreen(num1, operator, num2);
    }
    else if (num1.length < 12) {
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
            }, 1000)
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
    oper1 = oper1.toString();
    oper2 = oper2.toString();
    let screen = document.querySelector('.calc_screen');
    
    if (oper1.includes('.')) {
        oper1 = roundOperand(oper1);
    }

    if (oper2.includes('.')) {
        oper2 = roundOperand(oper2);
    } 

    let content = `${oper1}${symbol}${oper2}`;

    if (content.length > 12) {
        if (operators.some(operator => content.includes(operator))) {
            content = content.slice(-12);  
        }
        else if (!operators.some(operator => content.includes(operator)) && content.includes('.')){
            content = roundOperand(content).toString();
            content = content.slice(0,12);
        }
    }
    screen.textContent = content;
}

function roundOperand(operand, place=4) {
    let decimalPart = operand.slice(operand.indexOf('.'));
    let integralPart = operand.slice(0, operand.indexOf('.'));

    if (integralPart == '') 
        integralPart = '0';

    if (decimalPart.length > place+1) {
        decimalPart = parseFloat(decimalPart).toFixed(place);
    } else if (decimalPart.length === 1) 
        decimalPart += '0';

    return (parseInt(integralPart) + parseFloat(decimalPart));
}