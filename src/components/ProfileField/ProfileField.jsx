import React from 'react';
import PropTypes from 'prop-types';

import './ProfileField.scss';

function ProfileField(props) {
  const { label, value } = props;
  return (
    <div className="profile-field">
      <div className="profile-field-label">
        {label}
      </div>
      <div className="profile-field-value">
        {value}
      </div>
    </div>
  );
}

ProfileField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
};

ProfileField.defaultProps = {
  value: '--',
};

export default ProfileField;
