import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    try {
      // Evaluate the expression
      const evalResult = eval(equation);
      setResult(evalResult);
    } catch (error) {
      setResult('Error: Invalid expression');
    }
  }, [equation]);

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
        <Navigation />
      </div>
      {isPopupVisible && <Popup togglePopup={togglePopup} hint={currentLevel.hint} />}
      <FoundSolutions solutions={currentLevel.solutions} />
      {/* <HintPopup /> */}
      <HelpMenu />
    </div>
  );
}

export default App;
