import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

function Button(props) {
  const {
    className, type, onClick, disabled, children,
  } = props;
  return (
    <button className={`button ${className}`} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

Button.defaultProps = {
  className: '',
  type: 'button',
  onClick: () => {},
  disabled: false,
  children: null,
};

export default Button;
