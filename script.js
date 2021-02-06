
class Calculator {
    constructor(previousText, currentText) {
        this.previousText = previousText
        this.currentText = currentText
        this.clear()
    }
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = ''


    }
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        //if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case '+':
                computation = prev + curr;
                break
            case '-':
                computation = prev - curr;
                break
            case '*':
                computation = prev * curr;
                break
            case '/':
                computation = prev / curr;
                break
            case 'log':
                computation = Math.log10(prev);
                break
            case 'ln':
                computation = Math.log(prev);
                break
            case 'sin':
                computation = Math.sin(prev);
                break
            case 'cos':
                computation = Math.cos(prev);
                break
            case 'tan':
                computation = Math.tan(prev);
                break
            default:
                return
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integrerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];

        let integerDisplay
        if (isNaN(integrerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integrerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentText.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousText.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousText.innerText = ''
        }

    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equals]')
const acButton = document.querySelector('[data-ac]');
const delButton = document.querySelector('[data-del]');
const previousText = document.querySelector('[data-previous-operand]');
const currentText = document.querySelector('[data-current-operand]');


const calculator = new Calculator(previousText, currentText);


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});

equalButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

acButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

delButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})


window.addEventListener('keydown', (evt) => { //moving the player
    evt.preventDefault();
    switch (evt.key) {
        case '1':
            calculator.appendNumber('1');
            break
        case '2':
            calculator.appendNumber('2');
            break
        case '3':
            calculator.appendNumber('3');
            break
        case '4':
            calculator.appendNumber('4');
            break
        case '5':
            calculator.appendNumber('5');
            break
        case '6':
            calculator.appendNumber('6');
            break
        case '7':
            calculator.appendNumber('7');
            break
        case '8':
            calculator.appendNumber('8');
            break
        case '9':
            calculator.appendNumber('9');
            break
        case '0':
            calculator.appendNumber('0');
            break
        case '.':
            calculator.appendNumber('.');
            break
        case '/':
            calculator.chooseOperation('/');
            break
        case '*':
            calculator.chooseOperation('*');
            break
        case '+':
            calculator.chooseOperation('+');
            break
        case '-':
            calculator.chooseOperation('-');
            break
        case 'Enter':
            calculator.compute();
            break
        case 'Delete':
            calculator.delete();
            break
        default:
            return
    }
    calculator.updateDisplay();
});