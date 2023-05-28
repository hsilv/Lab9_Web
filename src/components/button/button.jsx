import '../../styles/button.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import React from 'react';

function Button({ operand, classes, onClick }) {
  const handleClick = () => {
    onClick(operand)
  }

  let butClasses;
  if (classes) {
    butClasses = [...classes, 'button'].join(' ');
  } else {
    butClasses = ['button'].join(' ');
  }
  return (
    <>
      <button className={butClasses} onClick={handleClick}>{operand}</button>
    </>
  );
}

Button.propTypes = {
  operand: PropTypes.string.isRequired,
  classes: PropTypes.array,
  onClick: PropTypes.func,
};

export default Button;
