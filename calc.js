const displayCurrent = document.getElementById('current-operand');
const displayPrevious = document.getElementById('previous-operand');
const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const dotButton = document.getElementById('dot');

let currentOperand = '';
let previousOperand = '';
let operation = null;

numberButtons.forEach(btn => btn.addEventListener('click', () => {
  appendNumber(btn.innerText);
  updateDisplay();
}));

operationButtons.forEach(btn => btn.addEventListener('click', () => {
  chooseOperation(btn.innerText);
  updateDisplay();
}));

equalsButton.addEventListener('click', () => {
  compute();
  updateDisplay();
});
clearButton.addEventListener('click', () => {
  clear();
  updateDisplay();
});
deleteButton.addEventListener('click', () => {
  deleteNumber();
  updateDisplay();
});
dotButton.addEventListener('click', () => {
  appendDot();
  updateDisplay();
});

function clear() {
  currentOperand = '';
  previousOperand = '';
  operation = null;
}

function deleteNumber() {
  currentOperand = currentOperand.toString().slice(0, -1);
}

function appendNumber(num) {
  if (num === '0' && currentOperand === '0') return;
  currentOperand = currentOperand.toString() + num.toString();
}

function appendDot() {
  if (currentOperand.includes('.')) return;
  if (currentOperand === '') currentOperand = '0';
  currentOperand += '.';
}

function chooseOperation(op) {
  if (currentOperand === '') return;
  if (previousOperand !== '') {
    compute();
  }
  operation = op;
  previousOperand = currentOperand;
  currentOperand = '';
}

function compute() {
  let result;
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(curr)) return;
  switch (operation) {
    case '+': result = prev + curr; break;
    case '−': result = prev - curr; break;
    case '×': result = prev * curr; break;
    case '÷': result = curr === 0 ? 'Error' : prev / curr; break;
    default: return;
  }
  currentOperand = result;
  operation = null;
  previousOperand = '';
}

function updateDisplay() {
  displayCurrent.innerText = currentOperand;
  displayPrevious.innerText = previousOperand + (operation || '');
}
