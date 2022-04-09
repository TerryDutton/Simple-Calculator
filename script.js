const display   = document.getElementById('display');
const baseDigit = document.getElementById('digit-template').content.firstElementChild;
const basePoint = document.getElementById('decimal-point-template').content.firstElementChild;        

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