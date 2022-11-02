const calcGrid = document.querySelector(".calculator-grid");
const clearBtn = document.querySelector(".clear");
const allClearBtn = document.querySelector(".allClear");
const equalBtn = document.querySelector(".equal");
const output = document.querySelector("#output");
const darkModeBtn = document.querySelector(".dark-mode-button");
const body = document.querySelector(".body");
const inputBtnList = document.querySelectorAll(".input-button");
const outputDiv = document.querySelector(".output-div");

let num1 = '';
let num2 = '';
let op = '';

function handleClick(e) {
    const target = e.target;

    if (target.classList.contains("number")) {
        outputValue(target);

        setGlobalVariables(target.textContent);
    }

    if (target.classList.contains("operator")) {
        if (handleOperatorClick(target)) {
            outputValue(target);
        }
        
        setGlobalVariables(target.textContent);
    }
}

function outputValue(target) {
    let inputValue = output.value;
    
    inputValue += target.textContent;
    output.value = inputValue;
}

function saveNumber(number) {
    if (op === '') {
        num1 += number;
    } else {
        num2 += number;
    }
}

function saveOperator(operator) {
    op = operator;
}

function equalClick() {
    num1 = parseInt(num1);
    num2 = parseInt(num2);
    let result;
    switch (op) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
            break;
    }
    output.value = result;
    clearGlobalVariables();
    num1 = result.toString();
}

function allClear() {
    output.value = '';
    clearGlobalVariables();
}

function clear() {
    output.value = output.value.slice(0, -1);
    if (op === '') {
        num1 = num1.slice(0, -1);
    }

    if (num2 === '' && op !== '') {
        op = '';
    }

    if (num2 !== '') {
        num2 = num2.slice(0, -1);
    }
}

function handleOperatorClick(target) {
    const operators = ['+', '-', '*', '/'];
    let result = true;

    for (let i = 0; i < output.value.length; i++) {
        if (operators.includes(output.value[i])) {
            result = false;
            break;
        }
    }

    if (operators.includes(output.value[output.value.length - 1])) {
        output.value = output.value.slice(0, -1);
        result = true;
    }
    return result;
}

function setGlobalVariables (symbol) {
    const parsed = parseInt(symbol);

        if (isNaN(parsed)) {
            saveOperator(symbol);
        } else {
            saveNumber(parsed);
        }
}

function clearGlobalVariables() {
    num1 = '';
    num2 = '';
    op = '';
}

function darkTheme() {
    body.classList.toggle("body-dark-mode");
    calcGrid.classList.toggle("dark-mode");
    outputDiv.classList.toggle("dark-mode");
    output.classList.toggle("dark-mode");
    darkModeBtn.classList.toggle("dark-mode");
    
    switch (darkModeBtn.textContent) {
        case "darkmode":
            darkModeBtn.textContent = "lightmode";
            break;
        case "lightmode":
            darkModeBtn.textContent = "darkmode";
            break;
    }

    for (let inputBtn of inputBtnList) {
        inputBtn.classList.toggle("dark-mode");
    }
}

calcGrid.addEventListener("click", handleClick);
equalBtn.addEventListener("click", equalClick);
allClearBtn.addEventListener("click", allClear);
clearBtn.addEventListener("click", clear);
darkModeBtn.addEventListener("click", darkTheme);