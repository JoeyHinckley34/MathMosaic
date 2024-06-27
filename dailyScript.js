// Global variables
var targetNumber;
var usedNumbers = [];
var numberButtons;
var body = document.getElementById('body');
var currentProblem; // Variable to keep track of the current problem
var foundSolutions = []; // Track found solutions
var dailyLevel;

// Load daily level data from JSON file
async function loadDailyLevel() {
    try {
        const response = await fetch('levels.json');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        dailyLevel = data.dailyLevel;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

// Initialize the app by loading daily level data and calling other functions
async function initializeApp() {
    await loadDailyLevel();
    initDailyLevel();
    populatePastProblems();
    //toggleHelpMenu()
}

// Event listener to ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

// Initialize the daily level for today
function initDailyLevel() {
    const today = getTodayDate();
    const problem = dailyLevel.find(p => p.date === today) || dailyLevel[0];
    currentProblem = problem; // Set the current problem
    displayProblem(today, problem);
    //document.getElementById('date').textContent = today;
    displayMathMosaicNumber(today);
}

// Display the problem for the given date
function displayProblem(date, problem, noClear=true) {
    usedNumbers = [];
    if (noClear){
        foundSolutions = []; // Reset found solutions for new problem
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

// Display the MathMosaic number based on the date
function displayMathMosaicNumber(date) {
    const startDate = new Date('2024-06-03');
    const currentDate = new Date(date);
    const dayDifference = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    document.querySelector('h1').textContent = `MathMosaic Daily #${dayDifference}`;
}

// Get today's date in YYYY-MM-DD format
function getTodayDate() {
    const date = new Date();
    return date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
}

// Set the target number in the UI
function setTarget(target) {
    document.getElementById('target').textContent = 'Target: ' + target;
}

// Clear the equation and result display
function clearEquationAndResult() {
    document.getElementById('equation').textContent = '';
    document.getElementById('result').textContent = '';
}

// Reset the background color to default
function resetBackgroundColor() {
    body.classList.remove('correct-bg', 'incorrect-bg');
    body.style.backgroundColor = '#ffffcc';
}

// Update the instructions in the UI
function updateInstructions(instructions) {
    document.getElementById('instructions').textContent = instructions;
}

// Create digit buttons for the given numbers
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

// Insert the value of the clicked button into the equation
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

// Delete the last character from the equation
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

// Check if the calculation can be performed
function checkForCalculation() {
    if (usedNumbers.length === numberButtons.length) {
        calculate();
    } else {
        updateBackgroundColor();
    }
}

// Perform the calculation and display the result
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

// Display the result of the calculation
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

// Show a popup with the solution
function showPopup(solution, result) {
    document.getElementById('solution-display').textContent = `Solution: ${solution} = ${result}`;
    document.getElementById('popup').classList.remove('hidden');
}

// Close the solution popup
function closePopup() {
    document.getElementById('popup').classList.add('hidden');
}

// Show a hint for the current problem
function showHint() {
    if (currentProblem && currentProblem.hint) {
        document.getElementById('hint-display').textContent = currentProblem.hint;
        document.getElementById('hint-popup').classList.remove('hidden');
    }
}

// Close the hint popup
function closeHintPopup() {
    document.getElementById('hint-popup').classList.add('hidden');
}

// Toggle the help menu
function toggleHelpMenu() {
    var helpMenu = document.getElementById('helpMenu');
    if (helpMenu.style.display === 'block') {
        helpMenu.style.display = 'none';
    } else {
        helpMenu.style.display = 'block';
    }
}

// Populate the past problems select menu
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

// Select a past problem from the menu
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

// Select a random problem from the past
function selectRandomProblem(noClear=true) {
    const today = getTodayDate();
    let randomLevel = dailyLevel[Math.floor(Math.random() * dailyLevel.length)];
    // Make sure random level has been already played
    while (randomLevel.date > today) {
        randomLevel = dailyLevel[Math.floor(Math.random() * dailyLevel.length)];
    }
    currentProblem = randomLevel;
    displayProblem(randomLevel.date, randomLevel, noClear);
    
    // Update the past problems date
    const pastSelect = document.getElementById('pastSelect');
    pastSelect.value = randomLevel.date;
}

// Update the background color based on the current state
function updateBackgroundColor() {
    body.classList.remove('correct-bg', 'incorrect-bg');
    body.style.backgroundColor = '#ffffcc'; // Reset to soft yellow
}

// Update the display of found solutions
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

// Set the total solutions count
function setTotalSolutionsCount(total) {
    const totalSolutionsCount = document.getElementById('total-solutions-count');
    totalSolutionsCount.textContent = total;
}
