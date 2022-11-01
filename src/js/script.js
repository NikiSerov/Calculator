const calcGrid = document.querySelector(".calculator-grid");
const clearBtn = document.querySelector(".clear");
const allClearBtn = document.querySelector(".allClear");
const equalBtn = document.querySelector(".equal");

function handleClick(e) {
    const target = e.target;
    if (target.classList.contains("number") || target.classList.contains("operator")) {
        let inputValue = document.getElementById("output").value;
        inputValue += target.textContent;
        document.getElementById("output").value = inputValue;
        const parsed = parseInt(target.textContent);
        if (isNaN(parsed)) {
            saveOperator(target.textContent);
        } else {
            saveNumber(parsed);
        }
    }
}

calcGrid.addEventListener("click", handleClick);
equalBtn.addEventListener("click", equalClick);
allClearBtn.addEventListener("click", allClear);
clearBtn.addEventListener("click", clear)

let num1 = '';
let num2 = '';
let op = '';

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
    document.getElementById("output").value = result;
}

function allClear() {
    document.getElementById("output").value = '';
}

function clear() {
    document.getElementById("output").value = document.getElementById("output").value.slice(0, -1);
}