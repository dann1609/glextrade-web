import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

import './ProfileHeader.scss';
import defaultImage from '../../assets/images/default_avatar.jpg';
import { uploadPicture, uploadCoverPicture } from '../../actions/user';


class ProfileHeader extends Component {
    avatarChanged=(event) => {
      const { files } = event.target;
      const file = files[0];

      if (file) {
        const { name, type } = file;

        uploadPicture({
          name,
          type,
          file,
        });
      }
    }

    coverChanged =(event) => {
      const { files } = event.target;
      const file = files[0];

      if (file) {
        const { name, type } = file;

        uploadCoverPicture({
          name,
          type,
          file,
        });
      }
    }

    render() {
      const { name, profileUrl, coverUrl } = this.props;
      return (
        <div className="profile-header">
          {coverUrl && <img src={coverUrl} alt="Cover" className="cover-image" />}
          <div className={`cover-add-container ${coverUrl ? '' : 'full-cover'}`}>
            <FontAwesomeIcon className="cover-add-icon" icon={faCamera} />
            <p className="cover-add-text">{coverUrl ? 'Cambia tu cover foto' : 'Sube tu cover foto'}</p>
          </div>
          <input className="cover-image-input" onChange={this.coverChanged} type="file" accept="image/*" />
          <div className="profile-image-container">
            <img src={profileUrl || defaultImage} alt="Avatar" className="profile-image" />
            <input className="profile-image-input" onChange={this.avatarChanged} type="file" accept="image/*" />
          </div>
          <h3 className="profile-header-title">{name}</h3>
        </div>
      );
    }
}

export default ProfileHeader;
