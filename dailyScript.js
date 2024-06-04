var dailyLevel = [
    { date: "2024-06-03", target: 13, numbers: [2, 4, 6, 8], instructions: "Solve the daily problem by using each number once to reach the target!", hint: "Two Solutions: 26 or 28" },
    { date: "2024-06-04", target: 5, numbers: [6, 7, 8, 9], instructions: "Solve the daily problem by using each number once to reach the target!", hint: "Four Solutions: 67 or 68 or 96 or /6" },
    { date: "2024-06-05", target: 18, numbers: [3, 4, 5, 9], instructions: "Solve the daily problem by using each number once to reach the target!", hint: "Three Solutions: 45 or 54 or *9" },
    { date: "2024-06-06", target: 30, numbers: [2, 3, 4, 5], instructions: "Solve the daily problem by using each number once to reach the target!", hint: "Three Solutions: 45 or 54 or /2" },
    { date: "2024-06-07", target: 84, numbers: [1, 2, 6, 8], instructions: "Solve the daily problem by using each number once to reach the target!", hint: "Three Solutions: 81 or 86 or /2" },
    { date: "2024-06-08", target: 2, numbers: [4, 5, 7, 9], instructions: "Solve the daily problem by using each number once to reach the target!", hint: "Three Solutions: 45 or 47 or 49" },
    { date: "2024-06-09", target: 14, numbers: [2, 5, 6, 8], instructions: "Solve the daily problem by using each number once to reach the target!", hint: "Four Solutions: 26 or 56 or *2 or /2" },
];

var targetNumber;
var usedNumbers = [];
var numberButtons;
var body = document.getElementById('body');
var currentProblem;

document.addEventListener('DOMContentLoaded', function () {
    initDailyLevel();
    populatePastProblems();
});

function initDailyLevel() {
    const today = getTodayDate();
    currentProblem = dailyLevel.find(p => p.date === today) || dailyLevel[0];
    
    displayProblem(today, currentProblem);
    document.getElementById('date').textContent = today;
}

function displayProblem(date, problem) {
    usedNumbers = [];

    setTarget(problem.target);
    clearEquationAndResult();
    resetBackgroundColor();
    updateInstructions(problem.instructions);
    createDigitButtons(problem.numbers);

    numberButtons = document.querySelectorAll('.digits button');
    targetNumber = problem.target;
}

function getTodayDate() {
    const date = new Date();
    return date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
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

function populatePastProblems() {
    const today = getTodayDate();
    const pastSelect = document.getElementById('pastSelect');
    pastSelect.innerHTML = '';

    dailyLevel.forEach(problem => {
        if (problem.date <= today) {
            const option = document.createElement('option');
            option.value = problem.date;
            option.textContent = problem.date;
            pastSelect.appendChild(option);
        }
    });
}

function selectPastProblem() {
    const pastSelect = document.getElementById('pastSelect');
    const selectedDate = pastSelect.value;
    const problem = dailyLevel.find(p => p.date === selectedDate);
    if (problem) {
        displayProblem(selectedDate, problem);
    }
}

function showHint() {
    if (currentProblem && currentProblem.hint) {
        document.getElementById('hint-display').textContent = currentProblem.hint;
        document.getElementById('hint-popup').classList.remove('hidden');
    }
}

function closeHintPopup() {
    document.getElementById('hint-popup').classList.add('hidden');
}

function updateBackgroundColor() {
    body.classList.remove('correct-bg', 'incorrect-bg');
    body.style.backgroundColor = '#ffffcc'; // Reset to soft yellow
}
