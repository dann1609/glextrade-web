import React from 'react';

import './ProfileField.scss';

function ProfileField(props) {
  const { label, value = '--' } = props;
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

export default ProfileField;
