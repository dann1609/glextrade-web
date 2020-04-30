import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './TextInput.scss';

class TextInput extends Component {
  constructor(props) {
    super(props);

    this.state = { value: '' };
  }

  onChange= (event) => {
    const { onChange, prefix = '' } = this.props;
    this.setState({ value: (event.target.value).substring(prefix.length) });
    if (onChange) {
      onChange(event.target.value);
    }
  };

  onBlur = () => {
    const { onBlur } = this.props;

    if (onBlur) {
      onBlur();
    }
  }

  render() {
    const {
      className, label, placeholder, type, error, prefix = '',
    } = this.props;
    const { value } = this.state;

    return (
      <div className={`${className} text-input-container`}>
        <label className="text-input-label">
          {label}
        </label>
        <input className="text-input-input" type={type || 'text'} placeholder={placeholder} id="text" value={`${prefix}${value}`} onBlur={this.onBlur} onChange={this.onChange} />
        <div className={`text-input-error-area ${error ? 'error-enabled' : ''}`}>
          {
          error
        }
        </div>
      </div>
    );
  }
}

TextInput.propTypes = {
  className: PropTypes.string,
};

TextInput.defaultProps = {
  className: '',
};

export default TextInput;
