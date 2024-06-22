var dailyLevel = [
    { date: "2024-06-03", target: 13, numbers: [2, 4, 6, 8], solutions: 2, hint: "26 or 28"},
    { date: "2024-06-04", target: 5, numbers: [6, 7, 8, 9], solutions: 4, hint: "67 or 68 or 96 or /6"},
    { date: "2024-06-05", target: 18, numbers: [3, 4, 5, 9],  solutions: 3, hint: "45 or 54 or *9"},
    { date: "2024-06-06", target: 30, numbers: [2, 3, 4, 5],  solutions: 3, hint: "45 or 54 or /2"},
    { date: "2024-06-07", target: 12, numbers: [2, 4, 5, 6], solutions: 7, hint: "64 or 56 or 42(2) or /2 or *4 or *2"},
    { date: "2024-06-08", target: 2, numbers: [4, 5, 7, 9],  solutions: 3, hint: "45 or 47 or 49"},
    { date: "2024-06-09", target: 14, numbers: [2, 5, 6, 8], solutions: 4, hint: "26 or 56 or *2 or /2"},
    { date: "2024-06-10", target: 18, numbers: [3, 5, 6, 9], solutions: 4, hint: "63 or 69 or *5(2)"},
    { date: "2024-06-11", target: 7, numbers: [1, 2, 4, 7], solutions: 4, hint: "21(2) or 24 or 42"},
    { date: "2024-06-12", target: 3, numbers: [4, 5, 6, 8], solutions: 6, hint: "45 or 64 or 48 or 56 or /4 or -4"},
    { date: "2024-06-13", target: 23, numbers: [5, 7, 8, 9], solutions: 2, hint: "98 or *9"},
    { date: "2024-06-14", target: 20, numbers: [3, 6, 7, 8], solutions: 2, hint: "78 or 36"},
    { date: "2024-06-15", target: 14, numbers: [1, 5, 7, 8], solutions: 3, hint: "17 or 15 or 85"},
    { date: "2024-06-16", target: 45, numbers: [1, 3, 5, 9], solutions: 6, hint: "39 or 35 or 53 or 15 or 51 or 31"},
    { date: "2024-06-17", target: 17, numbers: [4, 5, 6, 8], solutions: 3, hint: "48 or 54 or /4"},
    { date: "2024-06-18", target: 11, numbers: [4, 5, 6, 7], solutions: 4, hint: "46 or 57 or 64 or *6"},
    { date: "2024-06-19", target: 0, numbers: [2, 3, 4, 8], solutions: 4, hint: "24 or 32"},
    { date: "2024-06-20", target: 16, numbers: [1, 7, 8, 9], solutions: 4, hint: "18 or 17 or 81 or 97"},
    { date: "2024-06-21", target: 21, numbers: [1, 2, 3, 5], solutions: 5, hint: "25 or 15 or 13 or 31 or 52"},
    { date: "2024-06-22", target: 9, numbers: [5, 6, 7, 8], solutions: 4, hint: "57 or 65 or 58 or 76"},
    { date: "2024-06-23", target: 23, numbers: [2, 5, 6, 8], solutions: 6, hint: "58 or 26 or 25(2) or 85, /2"},
    { date: "2024-06-24", target: 36, numbers: [2, 3, 4, 9], solutions: 6, hint: "43 or 29 or 24 or 42 or 23 or /9" },
    { date: "2024-06-25", target: 25, numbers: [4, 2, 6, 7], solutions: 6, hint: "/2(2) or 64 or 27 or 24 or 67" },
    { date: "2024-06-26", target: 22, numbers: [2, 3, 8, 9], solutions: 5, hint: "+9 or -2 or +9 or 28 or 23" },
    { date: "2024-06-27", target: 3, numbers: [2, 6, 7, 8], solutions: 6, hint: "*6 or -7 or -2 or +6 or 72 or 78" },
    { date: "2024-06-28", target: 1, numbers: [2, 3, 4, 6], solutions: 8, hint: "*2 or *4 or +6 or /4 or /2 or /6 or 24 or 23" },
    { date: "2024-06-29", target: 29, numbers: [2, 3, 6, 9], solutions: 5, hint: "*3 or 36 or 26 or 32 or 92" },
    { date: "2024-06-30", target: 23, numbers: [3, 6, 7, 8], solutions: 4, hint: "+8 or +7 or 87 or 37" },
    { date: "2024-07-01", target: 15, numbers: [2, 3, 4, 7], solutions: 7, hint: "-3 or -4 or 27 or 72 or 24 or 32 or 47" },
    { date: "2024-07-02", target: 7, numbers: [3, 5, 8, 9], solutions: 3, hint: "-8 or +5 or 38" },
    { date: "2024-07-03", target: 15, numbers: [3, 6, 8, 9], solutions: 5, hint: "*9 or +9 or 69 or 96 or 63" },
    { date: "2024-07-04", target: 8, numbers: [2, 3, 4, 6], solutions: 6, hint: "+2 or /3 or +2 or 42 or 32 or 34" },
    { date: "2024-07-05", target: 1, numbers: [2, 4, 6, 7], solutions: 5, hint: "-4 or -2 or -7 or 42 or 42" },
    { date: "2024-07-06", target: 29, numbers: [2, 6, 7, 8], solutions: 5, hint: "+6 or +8 or 87 or 28 or 27" },
    { date: "2024-07-07", target: 8, numbers: [2, 3, 6, 8], solutions: 6, hint: "*3 or *2 or -8 or *8 or /3 or 36" },
    { date: "2024-07-08", target: 27, numbers: [2, 5, 7, 9], solutions: 4, hint: "29 or 72 or 25 or 79" },
    { date: "2024-07-09", target: 28, numbers: [3, 5, 6, 9], solutions: 4, hint: "-5 or 69 or 39 or 93" },
    { date: "2024-07-10", target: 24, numbers: [2, 3, 7, 8], solutions: 5, hint: "78 or 38 or 28 or 23 or 32" },
    { date: "2024-07-11", target: 2, numbers: [3, 4, 6, 8], solutions: 5, hint: "*3 or -4 or /6 or 68 or 86" },
    { date: "2024-07-12", target: 3, numbers: [2, 7, 8, 9], solutions: 4, hint: "*2 or -8 or 87 or 82" },
    { date: "2024-07-13", target: 27, numbers: [3, 4, 6, 9], solutions: 6, hint: "*3 or /3 or -6 or 69 or 96 or 63" },
    { date: "2024-07-14", target: 4, numbers: [2, 4, 5, 7], solutions: 4, hint: "+5 or +5 or -2 or /2" },
    { date: "2024-07-15", target: 29, numbers: [3, 4, 8, 9], solutions: 5, hint: "+9 or -4 or *3 or /3 or 43" },
    { date: "2024-07-16", target: 18, numbers: [2, 3, 6, 7], solutions: 5, hint: "-3 or +2 or 63 or 27 or 72" },
    { date: "2024-07-17", target: 29, numbers: [3, 4, 5, 6], solutions: 4, hint: "+6 or -4 or 53 or 64" },
    { date: "2024-07-18", target: 29, numbers: [3, 4, 5, 6], solutions: 4, hint: "+6 or -4 or 53 or 64" },
    { date: "2024-07-19", target: 21, numbers: [2, 3, 7, 9], solutions: 4, hint: "+7 or 27 or 23 or 93" },
    { date: "2024-07-20", target: 23, numbers: [2, 3, 8, 9], solutions: 4, hint: "*2 or -3 or /2 or 39" },
    { date: "2024-07-21", target: 11, numbers: [5, 6, 8, 9], solutions: 3, hint: "59 or 69 or 96" },
    { date: "2024-07-22", target: 28, numbers: [2, 3, 5, 9], solutions: 3, hint: "35 or 25 or 32" },
    { date: "2024-07-23", target: 11, numbers: [3, 4, 5, 6], solutions: 7, hint: "+5 or -3 or +4 or 56 or 35 or 46 or 64" },
    { date: "2024-07-24", target: 6, numbers: [4, 5, 6, 9], solutions: 3, hint: "*5 or +4 or +6" },
    { date: "2024-07-25", target: 13, numbers: [2, 3, 4, 5], solutions: 8, hint: "-4 or *4 or /2 or 45 or 25 or 24 or 32 or 45" },
];

var targetNumber;
var usedNumbers = [];
var numberButtons;
var body = document.getElementById('body');
var currentProblem; // Add a variable to keep track of the current problem
var foundSolutions = []; // Track found solutions

document.addEventListener('DOMContentLoaded', function () {
    initDailyLevel();
    populatePastProblems();
});

function initDailyLevel() {
    const today = getTodayDate();
    const problem = dailyLevel.find(p => p.date === today) || dailyLevel[0];
    currentProblem = problem; // Set the current problem
    displayProblem(today, problem);
    //document.getElementById('date').textContent = today;
    displayMathMosaicNumber(today);
}

function displayProblem(date, problem, noClear=true) {
    usedNumbers = [];
    if (noClear){
        foundSolutions = []; // Reset found Solutions for new problem
    }   
    updateFoundSolutionsDisplay(); // Update the display for found solutions
    currentProblem = problem; // Update the current problem when displaying a new one
    setTarget(problem.target);
    setTotalSolutionsCount(problem.solutions); // Set total solutions count
    clearEquationAndResult();
    resetBackgroundColor();
    updateInstructions("Use each number once to reach the target!"); //fix later?
    createDigitButtons(problem.numbers);
    numberButtons = document.querySelectorAll('.digits button');
    targetNumber = problem.target;
    displayMathMosaicNumber(currentProblem.date);
}

function displayMathMosaicNumber(date) {
    const startDate = new Date('2024-06-03');
    const currentDate = new Date(date);
    const dayDifference = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    document.querySelector('h1').textContent = `MathMosaic Daily #${dayDifference}`;
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
        if (!foundSolutions.includes(equation)){
            foundSolutions.push(equation)
            updateFoundSolutionsDisplay()
        }
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

function showHint() {
    if (currentProblem && currentProblem.hint) {
        document.getElementById('hint-display').textContent = currentProblem.hint;
        document.getElementById('hint-popup').classList.remove('hidden');
    }
}

function closeHintPopup() {
    document.getElementById('hint-popup').classList.add('hidden');
}

function toggleHelpMenu() {
    var helpMenu = document.getElementById('helpMenu');
    if (helpMenu.style.display === 'block') {
        helpMenu.style.display = 'none';
    } else {
        helpMenu.style.display = 'block';
    }
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
    // Set the selected option to today's date
    pastSelect.value = today;
}

function selectPastProblem(noClear=true) {
    const pastSelect = document.getElementById('pastSelect');
    const selectedDate = pastSelect.value;
    const problem = dailyLevel.find(p => p.date === selectedDate);
    if (problem) {
        currentProblem = problem; // Set the current problem
        displayProblem(selectedDate, problem, noClear);
        //document.getElementById('date').textContent = selectedDate; // Update displayed date
    }
}

function updateBackgroundColor() {
    body.classList.remove('correct-bg', 'incorrect-bg');
    body.style.backgroundColor = '#ffffcc'; // Reset to soft yellow
}

function updateFoundSolutionsDisplay() {
    const solutionsList = document.getElementById('solutions-list');
    const totalSolutions = document.getElementById('total-solutions');
    solutionsList.innerHTML = '';
    foundSolutions.forEach(solution => {
        const listItem = document.createElement('li');
        listItem.textContent = solution;
        solutionsList.appendChild(listItem);
    });
    totalSolutions.textContent = foundSolutions.length;
}

function setTotalSolutionsCount(total) {
    const totalSolutionsCount = document.getElementById('total-solutions-count');
    totalSolutionsCount.textContent = total;
}

