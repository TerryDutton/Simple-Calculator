const digitDisplay    = document.getElementById('digit-display');
const operatorDisplay = document.getElementById('operator-display');
const baseDigit       = document.getElementById('digit-template').content.firstElementChild;
const basePoint       = document.getElementById('decimal-point-template').content.firstElementChild; 
const decimalPointBtn = document.getElementById('decimal-btn');
const equalsBtn       = document.getElementById('equals-btn');
const clearEntryBtn   = document.getElementById('clear-entry');
const clearAllBtn     = document.getElementById('clear');
const numberBtns      = document.querySelectorAll('button.number');
const operatorBtns    = document.querySelectorAll('button.operator');

const displayLength = 10;
const digits = Array.from({length: displayLength}, () => baseDigit.cloneNode(true));
const points = Array.from({length: displayLength}, () => basePoint.cloneNode(true));
const calcFunctions = {
    "+": (a,b) => a + b,
    "-": (a,b) => a - b,
    "x": (a,b) => a * b,
    "÷": (a,b) => a / b
};

let isResetDisplayOnNextInput = false;
let lastInputWasOperator = false;
let firstOperand = null;
let secondOperand = null;
let displayedValue = "0";
updateDisplay();

digits.forEach((digit, i) => {
    digitDisplay.appendChild(digit);
    digitDisplay.appendChild(points[i]);
});
numberBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        addCharacterToDisplay(e.target.textContent);
    });
});
operatorBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        setOperator(e.target.textContent);
    });
});

clearEntryBtn.addEventListener('click', deleteCharacter);
decimalPointBtn.addEventListener('click', addDecimalPointToDisplay);

function setDisplayedCharacters(value){
    const valueToSet = value.replace(/\./, "");
    const blankSpace = ' '.repeat(displayLength - valueToSet.length);
    const charList = [...`${blankSpace}${valueToSet}`];
    charList.forEach((char, i) => digits[i].setAttribute('data-character', char));
}

function setDisplayedDecimalPoints(value){
    const attr = 'data-active';
    let activePointIndex = value.indexOf('.');
    if (activePointIndex > -1) activePointIndex += (displayLength - value.length);
    points.forEach((point, i) => {
        if (i === activePointIndex) point.setAttribute(attr,`${attr}`);
        else point.removeAttribute(attr);
    });
}

function updateDisplay(){
    setDisplayedCharacters(displayedValue);
    setDisplayedDecimalPoints(displayedValue);
}

function calculate(a, b, operator){
    if (calcFunctions[operator]) return calcFunctions[operator](a,b);
    else throw new TypeError(`Invalid operator "${operator}".`);
}

function setOperator(operator){
    operatorDisplay.textContent = operator;
    isResetDisplayOnNextInput = true;
}

function addCharacterToDisplay(char){
    if(!isResetDisplayOnNextInput && displayHasMaxCharacters()) return;
    if (isResetDisplayOnNextInput || displayedValue === "0") displayedValue = char;
    else displayedValue += char;
    isResetDisplayOnNextInput = false;
    updateDisplay();
}

function displayHasMaxCharacters(){
    return displayedValue.replace(/\D/g, "").length >= displayLength;
}


function addDecimalPointToDisplay(){
    if(displayedValue.includes(".") && !isResetDisplayOnNextInput) return;
    if(displayedValue === "" || isResetDisplayOnNextInput) displayedValue = "0.";
    else displayedValue += ".";
    isResetDisplayOnNextInput = false;
    updateDisplay();
}

function deleteCharacter(){
    displayedValue = displayedValue.slice(0, -1);
    if(!displayedValue) displayedValue = "0";
    updateDisplay();
}

function clearAll(){
    isResetDisplayOnNextInput = false;
    lastInputWasOperator = false;
    firstOperand = null;
    secondOperand = null;
    displayedValue = "0";
    updateDisplay();
}

/* What are the ways I want this to behave?
1. When you input a number, you input the digits one at a time and they appear in sequence.
2. When you press an operator button for the first time, it sets an operator.
3. When you enter a second number, it replaces the first one.
4. When you press equals, it does the set operation on the first and second numbers.
5. When you press equals again, it does the same operation on the displayed number with the same second operand. */

/* So what we're looking at here is... input to the first operand. Then after the first operator, 
all subsequent inputs are saved to the second operand, and all subsequent  */