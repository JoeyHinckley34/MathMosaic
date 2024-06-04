var dailyLevel = [
    { date: "06-03-2024", target: 13, numbers: [2, 4, 6, 8], instructions: "Solve the daily problem by using each number once to reach the target!" },
    { date: "06-04-2024", target: 5, numbers: [6, 7, 8, 9], instructions: "Solve the daily problem by using each number once to reach the target!" },
    { date: "06-05-2024", target: 18, numbers: [3, 4, 5, 9], instructions: "Solve the daily problem by using each number once to reach the target!" },
];

var currentLevel = 0;

var targetNumber;
var usedNumbers = [];
var numberButtons;
var body = document.getElementById('body');

function initDailyLevel(levelIndex) {
    var level = dailyLevel[levelIndex]
    targetNumber = level.target;
    usedNumbers = [];

    setTarget(targetNumber);
    clearEquationAndResult();
    resetBackgroundColor();
    updateInstructions(level.instructions);
    createDigitButtons(level.numbers);

    numberButtons = document.querySelectorAll('.digits button');
    updateDate();
}

function setTarget(target) {
    document.getElementById('target').textContent = 'Target: ' + target;
}

function clearEquationAndResult() {
    document.getElementById('equation').textContent = '';
    document.getElementById('result').textContent = '';
}

function resetBackgroundColor() {
    body.classList.remove('correct-bg', 'incorrect-bg');
    body.style.backgroundColor = '#ffffcc';
}

function updateInstructions(instructions) {
    document.getElementById('instructions').textContent = instructions;
}

function createDigitButtons(numbers) {
    var digitsContainer = document.getElementById('digits');
    digitsContainer.innerHTML = '';
    numbers.forEach(function(number) {
        var button = document.createElement('button');
        button.textContent = number;
        button.onclick = function() { insertValue(button); };
        digitsContainer.appendChild(button);
    });
}

function insertValue(button) {
    var equation = document.getElementById('equation');
    var value = button.textContent;
    if (!isNaN(value)) {
        equation.textContent += value;
        button.classList.add('disabled');
        usedNumbers.push(value);
        checkForCalculation();
    } else {
        equation.textContent += value;
    }
}

function deleteLast() {
    var equation = document.getElementById('equation');
    var resultDisplay = document.getElementById('result');
    var lastCharacter = equation.textContent.slice(-1);
    var buttons = document.querySelectorAll('.digits button');
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].textContent === lastCharacter) {
            buttons[i].classList.remove('disabled');
            break;
        }
    }
    equation.textContent = equation.textContent.slice(0, -1);
    if (!isNaN(lastCharacter)) {
        usedNumbers.pop();
    }
    resultDisplay.textContent = ''; // Clear result when deleting
    updateBackgroundColor();
}

function checkForCalculation() {
    if (usedNumbers.length === numberButtons.length) {
        calculate();
    } else {
        updateBackgroundColor();
    }
}

function calculate() {
    var equation = document.getElementById('equation').textContent;
    try {
        var result = eval(equation);
        if (isNaN(result) || !isFinite(result)) {
            displayResult("Not a valid equation", false, equation);
        } else {
            displayResult(result, result === targetNumber, equation);
        }
    } catch (error) {
        displayResult("Not a valid equation", false, equation);
    }
}

function displayResult(result, correct, equation) {
    var resultDisplay = document.getElementById('result');
    resultDisplay.textContent = result;
    if (correct) {
        body.classList.remove('incorrect-bg');
        body.classList.add('correct-bg');
        showPopup(equation, result);
    } else {
        body.classList.remove('correct-bg');
        body.classList.add('incorrect-bg');
    }
}

function showPopup(solution, result) {
    document.getElementById('solution-display').textContent = `Solution: ${solution} = ${result}`;
    document.getElementById('popup').classList.remove('hidden');
}

function closePopup() {
    document.getElementById('popup').classList.add('hidden');
}

function updateDate() {
    var date = new Date();
    var dateString = date.toDateString();
    document.getElementById('date').textContent = dateString;
}

function resetBackgroundColor() {
    body.classList.remove('correct-bg', 'incorrect-bg');
    body.style.backgroundColor = '#ffffcc';
}

function updateBackgroundColor() {
    body.classList.remove('correct-bg', 'incorrect-bg');
    body.style.backgroundColor = '#ffffcc'; // Reset to soft yellow
}

function populateLevelDropdown() {
    var levelSelect = document.getElementById('levelSelect');
    levelSelect.innerHTML = '';
    dailyLevel.forEach(function(level, index) {
        var option = document.createElement('option');
        option.value = index;
        option.textContent = 'MathMosaic ' + (index + 1);
        levelSelect.appendChild(option);
    });
}

function selectLevel() {
    var levelSelect = document.getElementById('levelSelect');
    currentLevel = parseInt(levelSelect.value);
    initDailyLevel(currentLevel);
}
// Initialize the daily level
initDailyLevel(currentLevel);

// Populate the dropdown and initialize the first level
populateLevelDropdown();

