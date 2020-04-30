import React, { Component } from 'react';

import './SelectInput.scss';

class SelectInput extends Component {
    onChange= (event) => {
      const { onChange } = this.props;
      this.setState({ value: event.target.value });
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

export default SelectInput;
