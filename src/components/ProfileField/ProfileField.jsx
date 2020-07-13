import React from 'react';
import PropTypes from 'prop-types';

import './ProfileField.scss';

function ProfileField(props) {
  const {
    label, value, contentEditable, onChange,
  } = props;

  const onChangeValue = (event) => {
    onChange(event.currentTarget.textContent);
  };

  return (
    <div className="profile-field">
      <div className={`profile-field-label ${contentEditable ? 'editable' : ''}`}>
        {label}
      </div>
      <div className={`profile-field-value ${contentEditable ? 'editable' : ''}`} contentEditable={contentEditable} onInput={onChangeValue}>
        {value}
      </div>
    </div>
  );
}

ProfileField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  contentEditable: PropTypes.bool,
  onChange: PropTypes.func,
};

ProfileField.defaultProps = {
  value: '--',
  contentEditable: false,
  onChange: () => {},
};

export default ProfileField;
