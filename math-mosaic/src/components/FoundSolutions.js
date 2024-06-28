import React from 'react';
import '../FoundSolutions.css'; // Correct the import path

function FoundSolutions({ solutions }) {
  return (
    <div className="found-solutions">
      <h2>Found Solutions</h2>
      {Object.keys(solutions).length > 0 ? (
        Object.entries(solutions).map(([numbers, opsSolutions], index) => (
          Object.entries(opsSolutions).map(([ops, expressions], idx) => {
            // Split the expression by operators to get the numbers
            const numbersInExpression = expressions[0].split(/[\+\-\*\/]/).map(num => num.trim());
            return (
              <div key={`${index}-${idx}`} className="solution-group">
                <div className="numbers">{numbersInExpression.join(',')}</div>
                <div className="operators">{JSON.parse(ops).join(',')}</div>
                <div className="expression">
                  {expressions.map((expression, i) => (
                    <div key={i} className="expression-item">{expression}</div>
                  ))}
                </div>
              </div>
            );
          })
        ))
      ) : (
        <p>No solutions found yet.</p>
      )}
    </div>
  );
}

export default FoundSolutions;
