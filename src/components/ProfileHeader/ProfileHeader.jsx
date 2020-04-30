import React from 'react';
import './ProfileHeader.scss';
import defaultImage from '../../assets/images/default_avatar.jpg';

function ProfileHeader(props) {
  const { name } = props;
  return (
    <div className="profile-header">
      <div className="profile-image-container">
        <img src={defaultImage} alt="Avatar" className="profile-image" />
      </div>
      <h3 className="profile-header-title">{name}</h3>
    </div>
  );
}

export default ProfileHeader;
