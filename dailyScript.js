// The target number to be achieved
var targetNumber;
// Array to keep track of used numbers
var usedNumbers = [];
// Variable to store number buttons
var numberButtons;
// Reference to the body element
var body = document.getElementById('body');
// Variable to keep track of the current problem
var currentProblem;
// Array to track found solutions
var foundSolutions = [];
// Variable to store daily level data
var dailyLevel;

// Function to load daily level data from a JSON file
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

// Initialize daily level data and then call other functions
async function initializeApp() {
    await loadDailyLevel();
    initDailyLevel();
    populatePastProblems();
    //toggleHelpMenu()
}

// Event listener to ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', initializeApp);

// Function to initialize the daily level
function initDailyLevel() {
    const today = getTodayDate();
    const problem = dailyLevel.find(p => p.date === today) || dailyLevel[0];
    currentProblem = problem; // Set the current problem
    displayProblem(today, problem);
    displayMathMosaicNumber(today);
}

// Function to display the problem for the given date
function displayProblem(date, problem, noClear = true) {
    usedNumbers = [];
    if (noClear) {
        foundSolutions = []; // Reset found solutions for new problem
    }
    updateFoundSolutionsDisplay(); // Update the display for found solutions
    currentProblem = problem; // Update the current problem when displaying a new one
    setTarget(problem.target);
    setTotalSolutionsCount(problem.solutions); // Set total solutions count
    clearEquationAndResult();
    resetBackgroundColor();
    updateInstructions("Use each number once to reach the target!");
    createDigitButtons(problem.numbers);
    numberButtons = document.querySelectorAll('.digits button');
    targetNumber = problem.target;
    displayMathMosaicNumber(currentProblem.date);
}

// Function to display the Math Mosaic number based on the date
function displayMathMosaicNumber(date) {
    const startDate = new Date('2024-06-03');
    const currentDate = new Date(date);
    const dayDifference = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    document.querySelector('h1').textContent = `MathMosaic Daily #${dayDifference}`;
}

// Function to get today's date in YYYY-MM-DD format
function getTodayDate() {
    return new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
}

// Function to set the target number in the UI
function setTarget(target) {
    document.getElementById('target').textContent = `Target: ${target}`;
}

// Function to clear the equation and result display
function clearEquationAndResult() {
    document.getElementById('equation').textContent = '';
    document.getElementById('result').textContent = '';
}

// Function to reset the background color
function resetBackgroundColor() {
    body.classList.remove('correct-bg', 'incorrect-bg');
    body.style.backgroundColor = '#ffffcc';
}

// Function to update the instructions in the UI
function updateInstructions(instructions) {
    document.getElementById('instructions').textContent = instructions;
}

// Function to create digit buttons based on the given numbers
function createDigitButtons(numbers) {
    const digitsContainer = document.getElementById('digits');
    digitsContainer.innerHTML = '';
    numbers.forEach(number => {
        const button = document.createElement('button');
        button.textContent = number;
        button.onclick = () => insertValue(button);
        digitsContainer.appendChild(button);
    });
}

// Function to insert the value of a button into the equation
function insertValue(button) {
    const equation = document.getElementById('equation');
    const value = button.textContent;
    if (!isNaN(value)) {
        equation.textContent += value;
        button.classList.add('disabled');
        usedNumbers.push(value);
        checkForCalculation();
    } else {
        equation.textContent += value;
    }
}

// Function to delete the last character from the equation
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

// Function to check if the calculation can be performed
function checkForCalculation() {
    if (usedNumbers.length === numberButtons.length) {
        calculate();
    } else {
        updateBackgroundColor();
    }
}

// Function to calculate the result of the equation
function calculate() {
    const equation = document.getElementById('equation').textContent;
    try {
        const result = eval(equation);
        if (isNaN(result) || !isFinite(result)) {
            displayResult("Not a valid equation", false, equation);
        } else {
            displayResult(result, result === targetNumber, equation);
        }
    } catch (error) {
        displayResult("Not a valid equation", false, equation);
    }
}

// Function to display the result of the calculation
function displayResult(result, correct, equation) {
    document.getElementById('result').textContent = result;
    if (correct) {
        body.classList.remove('incorrect-bg');
        body.classList.add('correct-bg');
        if (!foundSolutions.includes(equation)) {
            foundSolutions.push(equation);
            updateFoundSolutionsDisplay();
        }
        showPopup(equation, result);
    } else {
        body.classList.remove('correct-bg');
        body.classList.add('incorrect-bg');
    }
}

// Function to show a popup with the solution
function showPopup(solution, result) {
    document.getElementById('solution-display').textContent = `Solution: ${solution} = ${result}`;
    document.getElementById('popup').style.display = 'block';
}

// Function to close the popup
function closePopup() {
    document.getElementById('popup').classList.add('hidden');
}

// Function to show the hint popup
function showHint() {
    if (currentProblem && currentProblem.hint) {
        document.getElementById('hint-display').textContent = currentProblem.hint;
        document.getElementById('hint-popup').classList.remove('hidden');
    }
}

// Function to close the hint popup
function closeHintPopup() {
    document.getElementById('hint-popup').classList.add('hidden');
}

// Function to toggle the help menu
function toggleHelpMenu() {
    var helpMenu = document.getElementById('helpMenu');
    if (helpMenu.style.display === 'block') {
        helpMenu.style.display = 'none';
    } else {
        body.style.backgroundColor = '#ffffcc'; // Light yellow otherwise
    }
}

// Function to update the display of found solutions
function updateFoundSolutionsDisplay() {
    const foundSolutionsContainer = document.getElementById('found-solutions');
    foundSolutionsContainer.innerHTML = '';
    foundSolutions.forEach(solution => {
        const solutionElement = document.createElement('div');
        solutionElement.textContent = solution;
        foundSolutionsContainer.appendChild(solutionElement);
    });
    // Set the selected option to today's date
    pastSelect.value = today;
}

// Function to set the total solutions count in the UI
function setTotalSolutionsCount(count) {
    document.getElementById('total-solutions').textContent = `Total Solutions: ${count}`;
}

// Function to populate past problems (if any)
function populatePastProblems() {
    // Implementation for populating past problems can be added here
}

// Function to toggle the help menu (if needed)
function toggleHelpMenu() {
    // Implementation for toggling the help menu can be added here
}
