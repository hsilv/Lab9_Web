import '../../styles/display.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import React from 'react';

function Display({ input }) {
  const operands = ['+', '-', '/', '%', '*'];

  const displayF = () => {
    if (operands.includes(input[2])) {
      return input[1];
    }
    return input[2];
  };

  return (
    <>
      <div className="display">
        <p className="results">{input[0]}{input[1]}</p>
        <p className="inputs">{displayF()}</p>
      </div>
    </>
  );
}

Display.propTypes = {
  input: PropTypes.array.isRequired,
};

export default Display;
