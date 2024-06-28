import React, { useState, useEffect } from 'react';
import { evaluate } from 'mathjs'; // Import evaluate from mathjs
import './styles.css';
import Header from './components/Header';
import EquationContainer from './components/EquationContainer';
import Digits from './components/Digits';
import Operators from './components/Operators';
import Navigation from './components/Navigation';
import Popup from './components/Popup';
// import HintPopup from './components/HintPopup';
import HelpMenu from './components/HelpMenu';
import FoundSolutions from './components/FoundSolutions';
import Controls from './components/Controls';
import levelsData from './levels.json';

function App() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [equation, setEquation] = useState('');
  const [usedDigits, setUsedDigits] = useState([]);
  const [result, setResult] = useState('');
  const [foundSolutions, setFoundSolutions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the daily level based on the current date
    const today = new Date().toISOString().split('T')[0];
    const level = levelsData.dailyLevel.find(level => level.date === today);
    setCurrentLevel(level);
  }, []);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleDigitClick = (digit) => {
    if (!usedDigits.includes(digit)) {
      setEquation(prevEquation => prevEquation + digit);
      setUsedDigits(prevUsedDigits => [...prevUsedDigits, digit]);
    }
  };

  const handleOperatorClick = (operator) => {
    setEquation(prevEquation => prevEquation + ' ' + operator + ' ');
  };

  const handleDelete = () => {
    setEquation(prevEquation => {
      const newEquation = prevEquation.trim().slice(0, -1).trim();
      const lastChar = prevEquation.trim().slice(-1);
      if (!isNaN(lastChar)) {
        setUsedDigits(prevUsedDigits => prevUsedDigits.filter(digit => digit !== parseInt(lastChar)));
      }
      return newEquation;
    });
  };

  const handleClear = () => {
    setEquation('');
    setUsedDigits([]);
  };

  const handleLevelChange = (level) => {
    setCurrentLevel(level);
  };

  const handleRandomLevel = () => {
    const pastLevels = levelsData.dailyLevel.filter(level => new Date(level.date) < new Date());
    const randomLevel = pastLevels[Math.floor(Math.random() * pastLevels.length)];
    setCurrentLevel(randomLevel);
  };

  useEffect(() => {
    if (currentLevel && equation.trim() !== '') {
      try {
        // Validate the equation
        if (/[^0-9+\-*/().\s]/.test(equation)) {
          throw new Error('Invalid characters in equation');
        }

        // Evaluate the expression using mathjs
        const evalResult = evaluate(equation);
        setResult(evalResult);
        console.log(`Evaluated Result: ${evalResult}`);

        // Check if the equation uses all 4 numbers and matches the target
        if (usedDigits.length === 4) {
          console.log(`Used Digits: ${usedDigits}`);
          if (evalResult === currentLevel.target) {
            console.log(`Equation matches target: ${equation}`);
            setFoundSolutions(prevSolutions => [...prevSolutions, equation]);
          } else {
            console.log(`Result does not match target: ${currentLevel.target}`);
          }
        } else {
          console.log(`Not all digits used: ${usedDigits.length}`);
        }
      } catch (error) {
        console.error('Error evaluating expression:', error);
        setError('Invalid expression');
      }
    } else {
      console.log('Current level or equation is not valid for evaluation');
    }
  }, [equation, usedDigits, currentLevel]);

  if (!currentLevel) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Header currentLevel={currentLevel} />
      <EquationContainer equation={equation} result={result} />
      <Digits numbers={currentLevel.numbers} onDigitClick={handleDigitClick} usedDigits={usedDigits} />
      <Operators onOperatorClick={handleOperatorClick} />
      <Controls onDelete={handleDelete} onHint={togglePopup} onClear={handleClear} />
      <div className="navigation-container">
        <Navigation 
          levels={levelsData.dailyLevel} 
          currentLevel={currentLevel} 
          onLevelChange={handleLevelChange} 
          onRandomLevel={handleRandomLevel} 
        />
      </div>
      {isPopupVisible && <Popup togglePopup={togglePopup} hint={currentLevel.hint} />}
      {error && <div className="error">{error}</div>}
      <FoundSolutions solutions={foundSolutions} />
      <HelpMenu />
    </div>
  );
}

export default App;
