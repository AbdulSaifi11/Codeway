document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '0';
    let firstOperand = null;
    let secondOperand = null;
    let operator = null;
    let shouldResetDisplay = false;

    function updateDisplay() {
        display.textContent = currentInput;
    }

    function clear() {
        currentInput = '0';
        firstOperand = null;
        secondOperand = null;
        operator = null;
        shouldResetDisplay = false;
        updateDisplay();
    }

    function inputDigit(digit) {
        if (shouldResetDisplay) {
            currentInput = digit;
            shouldResetDisplay = false;
        } else {
            currentInput = currentInput === '0' ? digit : currentInput + digit;
        }
        updateDisplay();
    }

    function inputDecimal(dot) {
        if (shouldResetDisplay) {
            currentInput = '0.';
            shouldResetDisplay = false;
            return;
        }
        if (!currentInput.includes(dot)) {
            currentInput += dot;
        }
        updateDisplay();
    }

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(currentInput);

        if (operator && shouldResetDisplay) {
            operator = nextOperator;
            return;
        }

        if (firstOperand === null) {
            firstOperand = inputValue;
        } else if (operator) {
            const result = performCalculation(operator, firstOperand, inputValue);
            currentInput = String(result);
            firstOperand = result;
        }

        shouldResetDisplay = true;
        operator = nextOperator;
        updateDisplay();
    }

    function performCalculation(operator, firstOperand, secondOperand) {
        switch (operator) {
            case '+':
                return firstOperand + secondOperand;
            case '-':
                return firstOperand - secondOperand;
            case '*':
                return firstOperand * secondOperand;
            case '/':
                return firstOperand / secondOperand;
            default:
                return secondOperand;
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const { value } = button.dataset;

            if (button.classList.contains('operator')) {
                handleOperator(value);
            } else if (button.classList.contains('decimal')) {
                inputDecimal(value);
            } else if (button.classList.contains('clear')) {
                clear();
            } else if (button.classList.contains('equal')) {
                handleOperator(operator);
                operator = null;
            } else {
                inputDigit(value);
            }
        });
    });

    document.getElementById('clear').addEventListener('click', clear);
    document.getElementById('equal').addEventListener('click', () => handleOperator(operator));

    updateDisplay();
});
