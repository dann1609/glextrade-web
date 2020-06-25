import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './SelectInput.scss';

class SelectInput extends Component {
    onChange= (event) => {
      const { onChange } = this.props;
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
        label, placeholder, list, error,
      } = this.props;
      return (
        <div className="select-input-container">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="text-input-label">
            {label}
          </label>
          <select className="select-input-input" onBlur={this.onBlur} onChange={this.onChange}>
            <option disabled selected value>{placeholder}</option>
            {
                list.map((option) => (<option value={option.value}>{option.label}</option>))
            }
          </select>
          <div className={`select-input-error-area ${error ? 'error-enabled' : ''}`}>
            {
                  error
              }
          </div>
        </div>
      );
    }
}

SelectInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })),
  error: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
};

SelectInput.defaultProps = {
  label: '',
  placeholder: '',
  list: [],
  error: '',
  onBlur: null,
  onChange: null,
};

export default SelectInput;
