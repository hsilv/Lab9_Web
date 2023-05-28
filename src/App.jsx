/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './styles/App.css';
import Display from './components/display/display.jsx';
import Button from './components/button/button.jsx';

const operands = ['+', '-', '/', '%', '*'];
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'];

export function App() {
  const [count, setCount] = useState(['', '', '']);

  const equal = (arr, newOperand) => {
    let newState = [...arr];
    const parsed = newState.map((item, index) => {
      if (index === 0 || index === 2) {
        if (item.includes('.')) {
          return parseFloat(item);
        }
        return parseInt(item, 10);
      }
      return item;
    });

    if (parsed[1] === '+') {
      if (newOperand === '') {
        newState = ['', '', (parsed[0] + parsed[2]).toString()];
      } else {
        newState = ['', (parsed[0] + parsed[2]).toString(), newOperand];
      }
      return newState;
    }
    if (parsed[1] === '-') {
      if (newOperand === '') {
        newState = ['', '', (parsed[0] - parsed[2]).toString()];
      } else {
        newState = ['', (parsed[0] - parsed[2]).toString(), newOperand];
      }
      return newState;
    }
    if (parsed[1] === '*') {
      if (newOperand === '') {
        newState = ['', '', (parsed[0] * parsed[2]).toString()];
      } else {
        newState = ['', (parsed[0] * parsed[2]).toString(), newOperand];
      }
      return newState;
    }
    if (parsed[1] === '/') {
      if (parsed[2] === 0) {
        newState = ['ERROR', '', ''];
        return newState;
      }
      if (newOperand === '') {
        newState = ['', '', (parsed[0] / parsed[2]).toString()];
      } else {
        newState = ['', (parsed[0] / parsed[2]).toString(), newOperand];
      }
      return newState;
    }
    if (parsed[1] === '%') {
      if (newOperand === '') {
        newState = ['', '', (parsed[0] % parsed[2]).toString()];
      } else {
        newState = ['', (parsed[0] % parsed[2]).toString(), newOperand];
      }
      return newState;
    }
    return '';
  };

  const pushOperand = (newOperand) => {
    setCount((prevState) => {
      let newState = [...prevState];

      if (newState[2].includes('.') && newOperand === '.') {
        return newState;
      }

      if (newState.includes('Syntax Error') || newState.includes('ERROR')) {
        newState = ['', '', ''];
      }

      if (operands.includes(newOperand) && operands.includes(newState[1])) {
        newState = equal(newState, newOperand);
        if (newState[1].includes('.')) {
          if (parseFloat(newState[1]) > 999999999) {
            return ['ERROR', '', ''];
          }
          return newState.map((value) => value.slice(0, 9));
        }
        if (parseInt(newState[1], 10) > 999999999) {
          return ['ERROR', '', ''];
        }
        return newState.map((value) => value.slice(0, 9));
      }
      if (newOperand === '=') {
        if (operands.includes(newState[1])) {
          newState = equal(newState, '');
          if (newState[2].includes('.')) {
            if (parseFloat(newState[2]) > 999999999) {
              return ['ERROR', '', ''];
            }
            return newState.map((value) => value.slice(0, 9));
          }
          if (parseInt(newState[2], 10) > 999999999) {
            return ['ERROR', '', ''];
          }
          return newState.map((value) => value.slice(0, 9));
        }
        return newState;
      }

      if (
        operands.includes(newOperand)
        && !numbers.includes(newState[2].charAt(0))
        && !(
          newState[2].charAt(0) === '-'
          && numbers.includes(newState[2].charAt(1))
        )
      ) {
        if (!numbers.includes(newState[1].charAt(0))) {
          newState[1] = '0';
        }
        newState[2] = newOperand;
        return newState;
      }
      if (
        (numbers.includes(newState[2].charAt(0))
          || (newState[2].charAt(0) === '-'
            && numbers.includes(newState[2].charAt(1))))
        && (!operands.includes(newOperand) || newOperand === '+/-')
      ) {
        if (newState[2].length + 1 >= 9) {
          return newState;
        }
        if (newState[2].includes('.')) {
          if (parseFloat(newState[2]) > 999999999) {
            return ['ERROR', '', ''];
          }
        } else if (parseInt(newState[2], 10) > 999999999) {
          return ['ERROR', '', ''];
        }
        if (newOperand === '+/-') {
          if (numbers.includes(newState[2].charAt(0))) {
            newState[2] = `-${newState[2]}`;
            return newState;
          }
          if (newState[2].charAt(0) === '-') {
            const str = newState[2].split('');
            str[0] = '';
            newState[2] = str.join('');
            return newState;
          }
          return newState;
        }
        newState[2] += newOperand;
        return newState;
      }
      if (newOperand === '+/-') {
        return newState;
      }
      newState.shift();
      newState.push(newOperand);
      return newState;
    });
  };

  const clearDisplay = () => {
    setCount(['', '', '']);
  };

  return (
    <>
      <div className="calcBody">
        <Display input={count} />
        <div className="buttonContainer">
          <Button operand="C" classes={['c1-3']} onClick={clearDisplay} />
          <Button operand="%" onClick={pushOperand} />
          <Button operand="/" onClick={pushOperand} />
          <Button operand="7" classes={['number']} onClick={pushOperand} />
          <Button operand="8" classes={['number']} onClick={pushOperand} />
          <Button operand="9" classes={['number']} onClick={pushOperand} />
          <Button operand="*" onClick={pushOperand} />
          <Button operand="4" classes={['number']} onClick={pushOperand} />
          <Button operand="5" classes={['number']} onClick={pushOperand} />
          <Button operand="6" classes={['number']} onClick={pushOperand} />
          <Button operand="-" onClick={pushOperand} />
          <Button operand="1" classes={['number']} onClick={pushOperand} />
          <Button operand="2" classes={['number']} onClick={pushOperand} />
          <Button operand="3" classes={['number']} onClick={pushOperand} />
          <Button operand="+" onClick={pushOperand} />
          <Button operand="+/-" onClick={pushOperand} />
          <Button operand="0" classes={['number']} onClick={pushOperand} />
          <Button operand="." onClick={pushOperand} />
          <Button operand="=" onClick={pushOperand} />
        </div>
      </div>
    </>
  );
}

export default { App };
