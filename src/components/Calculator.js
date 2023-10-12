import React, { useState, useEffect } from 'react';
import '../styles/Calculator.css';

const evaluateExpression = (expression) => {
  const numberTokens = expression.split(/[\+\-\*\/]/);
  const operatorTokens = expression.match(/[\+\-\*\/]/g) || [];
  let result = parseFloat(numberTokens[0]);
  
  for (let i = 0; i < operatorTokens.length; i++) {
    const currentNumber = parseFloat(numberTokens[i + 1]);
    const currentOperator = operatorTokens[i];

    switch (currentOperator) {
      case '+':
        result += currentNumber;
        break;
      case '-':
        result -= currentNumber;
        break;
      case '*':
        result *= currentNumber;
        break;
      case '/':
        if(currentNumber !== 0){
          result /= currentNumber;
        } else {
          throw new Error("Cannot divide by zero");
        }
        break;
      default:
        throw new Error("Unrecognized operator: " + currentOperator);
    }
  }
  
  return result.toString();
};

const Calculator = () => {
  const [input, setInput] = useState("");

  const handleButtonClick = (value) => {
    if (value === "=") {
      try {
        setInput((prevInput) => {
          const sanitizedInput = prevInput.replace(/(^|\D)0+(\d)/g, '$1$2');
          return evaluateExpression(sanitizedInput);
        });
      } catch (error) {
        setInput("Error");
      }
    } else if (value === "%") {
      try {
        setInput((prevInput) => {
          const result = evaluateExpression(prevInput) / 100;
          return String(result);
        });
      } catch (error) {
        setInput("Error");
      }
    } else if (value === "-/+") {
      try {
        setInput((prevInput) => {
          const result = evaluateExpression(prevInput) * -1;
          return String(result);
        });
      } catch (error) {
        setInput("Error");
      }
    } else {
      setInput((prevInput) => prevInput + value);
    }
  };
  

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '+':
        case '-':
        case '*':
        case '/':
        case '.':
          handleButtonClick(e.key);
          break;
        case 'Enter':
          e.preventDefault();
          handleButtonClick('=');
          break;
        case 'Backspace':
          setInput("");
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    document.querySelector('.calculator input').focus();
  }, []);


  return (
    <div className="calculator-container">
      <div className="calculator">
        <input type="text" value={input} readOnly />
        <button className="clear" onClick={() => setInput("")}>AC</button>
        <button className="operator" onClick={() => handleButtonClick("-/+")}>-/+</button>
        <button className="operator" onClick={() => handleButtonClick("%")}>%</button>
        <button className="operator" onClick={() => handleButtonClick("/")}>/</button>
        <button className="transparent" onClick={() => handleButtonClick("7")}>7</button>
        <button className="transparent" onClick={() => handleButtonClick("8")}>8</button>
        <button className="transparent" onClick={() => handleButtonClick("9")}>9</button>
        <button className="operator" onClick={() => handleButtonClick("*")}>*</button>
        <button className="transparent" onClick={() => handleButtonClick("4")}>4</button>
        <button className="transparent" onClick={() => handleButtonClick("5")}>5</button>
        <button className="transparent" onClick={() => handleButtonClick("6")}>6</button>
        <button className="operator" onClick={() => handleButtonClick("-")}>-</button>
        <button className="transparent" onClick={() => handleButtonClick("1")}>1</button>
        <button className="transparent" onClick={() => handleButtonClick("2")}>2</button>
        <button className="transparent" onClick={() => handleButtonClick("3")}>3</button>
        <button className="operator" onClick={() => handleButtonClick("+")}>+</button>
        <button className="transparent double" onClick={() => handleButtonClick("0")}>0</button>
        <button className="transparent" onClick={() => handleButtonClick(".")}>.</button>
        <button className="equals" onClick={() => handleButtonClick("=")}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
