const display       = document.getElementById('digit-display');
const baseDigit     = document.getElementById('digit-template').content.firstElementChild;
const basePoint     = document.getElementById('decimal-point-template').content.firstElementChild; 
const decimalBtn    = document.getElementById('decimal-btn');
const clearEntryBtn = document.getElementById('clear-entry');
const clearAllBtn   = document.getElementById('clear');
const numberBtns    = document.querySelectorAll('button.number');      

const displayLength = 10;
const digits = Array.from({length: displayLength}, _ => baseDigit.cloneNode(true));
const points = Array.from({length: displayLength}, _ => basePoint.cloneNode(true));

digits.forEach((digit, i) => {
    display.appendChild(digit);
    display.appendChild(points[i]);
});

function setCharacters(value){
    const valueToSet = value.replace(/\./, "");
    const blankSpace = ' '.repeat(displayLength - valueToSet.length);
    const charList = [...`${blankSpace}${valueToSet}`];
    charList.forEach((char, i) => digits[i].setAttribute('data-character', char));
}

function setDecimalPoint(value){
    let activePointIndex = value.indexOf('.');
    if (activePointIndex > -1) activePointIndex += (displayLength - value.length);
    
    const attr = 'data-active';
    points.forEach((point, i) => {
        if (i === activePointIndex) point.setAttribute(attr,`${attr}`);
        else point.removeAttribute(attr);
    });
}

let displayedCharacters = "";
addCharacterToDisplay("0");

function addCharacterToDisplay(char){
    if(displayedCharacters === "0" && char !== ".") displayedCharacters = char;
    else displayedCharacters += char;
    updateDisplay();
}

function deleteLastCharacter(){
    const slice = displayedCharacters.slice(0, -1);
    if(slice === '') displayedCharacters = "0";
    else displayedCharacters = slice;
    updateDisplay();
}

function updateDisplay(){
    setCharacters(displayedCharacters);
    setDecimalPoint(displayedCharacters);
}

numberBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        addCharacterToDisplay(e.target.textContent);
    });
});

decimalBtn.addEventListener('click', () => {
    if(displayedCharacters.includes(".")) return;
    addCharacterToDisplay(".");
});

clearEntryBtn.addEventListener('click', deleteLastCharacter);