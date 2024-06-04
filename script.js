var levels = [
    { target: 10, numbers: [1, 2, 3, 4], instructions: "Welcome to MathMosaic! The goal is to use the numbers below to create an equation that equals the target number. Use each number once. Good luck!" },
    { target: 322, numbers: [1, 2, 3, 4], instructions: "Combining digits like 12+34 is valid. The only rule is use each number once to reach the target number." },
    { target: 11, numbers: [1, 2, 3, 4], instructions: "Most levels have more than one solution! This one has 65! The last level only 2: 14*23 and 23*14" },
    { target: 0, numbers: [1, 2, 3, 4], instructions: "Feel free to skip around to any level you like and have some fun!"},
    { target: 16, numbers: [5, 5, 5, 5], instructions: "BUG ALERT: Numbers that are the same break my delete function :/ just refresh to try again"},
    { target: 35, numbers: [2, 3, 6, 8], instructions: "Let's keep the number unique for now"},
    { target: 30, numbers: [2, 3, 6, 9]},
    { target: 9, numbers: [2, 3, 4, 6]},
    { target: 15, numbers: [0, 1, 2, 8]},
    { target: 210, numbers: [2, 6, 7, 8]},
    { target: 15, numbers: [1, 2, 3, 4, 5], instructions: "Wait we can have more than four numbers?"},
    { target: 7, numbers: [1, 3, 4, 5, 7]},
    { target: 99, numbers: [2, 3, 4, 6, 7]},
    { target: 104, numbers: [1, 7, 8, 9], instructions: "3 unique solutions here, 1 very challenging"},
    { target: 100, numbers: [5, 6, 7, 8]},
    { target: 11, numbers: [3, 4, 7, 9]},
    { target: 13, numbers: [2, 4, 6, 8]},
    { target: 22, numbers: [3, 5, 7, 9]},
    { target: 78, numbers: [1, 6, 8, 9]},
    { target: 52, numbers: [2, 0, 4, 8], instructions: "2 very different solutions here"}
];

var currentLevel = 0;
var targetNumber;
var usedNumbers = [];
var numberButtons;
var body = document.getElementById('body');

function initLevel(levelIndex) {
    var level = levels[levelIndex];
    targetNumber = level.target;
    usedNumbers = [];

    setTarget(targetNumber);
    clearEquationAndResult();
    resetBackgroundColor();
    updateInstructions(levelIndex, level.instructions);
    createDigitButtons(level.numbers);

    numberButtons = document.querySelectorAll('.digits button');
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

function updateInstructions(levelIndex, instructions) {
    if (levelIndex === 0) {
        document.getElementById('instructions').style.display = 'block';
    } else {
        document.getElementById('instructions').style.display = 'none';
    }
    document.getElementById('level-instructions').textContent = instructions;
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
        showPopup(equation,result);
    } else {
        body.classList.remove('correct-bg');
        body.classList.add('incorrect-bg');
    }
}

function showPopup(solution,result) {
    document.getElementById('solution-display').textContent = `Solution: ${solution} = ${result}`;
    document.getElementById('popup').classList.remove('hidden');
}

function closePopup() {
    document.getElementById('popup').classList.add('hidden');
}

function nextLevel() {
    document.getElementById('popup').classList.add('hidden');
    currentLevel = (currentLevel + 1) % levels.length;
    var levelSelect = document.getElementById('levelSelect');
    levelSelect.value = currentLevel;
    initLevel(currentLevel);
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
    levels.forEach(function(level, index) {
        var option = document.createElement('option');
        option.value = index;
        option.textContent = 'Level ' + (index + 1);
        levelSelect.appendChild(option);
    });
}

function selectLevel() {
    var levelSelect = document.getElementById('levelSelect');
    currentLevel = parseInt(levelSelect.value);
    initLevel(currentLevel);
}

// Populate the dropdown and initialize the first level
populateLevelDropdown();
initLevel(currentLevel);
