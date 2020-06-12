import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faCheck } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import './ProfileHeader.scss';
import defaultImage from '../../assets/images/default_avatar.jpg';
import { uploadPicture, uploadCoverPicture } from '../../actions/user';
import Modal from '../Modal/Modal';
import { connect } from '../../actions/company';
import Button from '../Button/Button';

const avatarChanged = (event) => {
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
};

const coverChanged = (event) => {
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
};

function ProfileHeader(props) {
  const {
    company, name, profileUrl, coverUrl, isMyProfile, setCompany, session,
  } = props;

  const currentUser = session.user;
  const currentCompany = currentUser.company;

  const [modal, setModal] = useState({
    visible: false,
  });

  const connectWithCompany = () => {
    connect(company._id).then((response) => {
      if (response.error) {} else {
        setCompany(response);
      }
    });
  };

  const connectDialog = () => {
    setModal({
      visible: true,
      message: `Deseas enviar una invitación a conectar a ${company.name}?`,
      actions: [{
        name: 'Enviar',
        onClick: connectWithCompany,
      }],
    });
  };

  const getRightButton = () => {
    const { ourRelation = {} } = company;
    const { relation = {} } = ourRelation;
    const { type } = relation;

    const invitationSender = type === 'INVITATION_SEND' && currentCompany._id === relation.sender;
    const connection = type === 'CONNECTED';

    const rightButtonOptions = {
      name: 'Conectar',
      onClick: connectDialog,
    };

    if (invitationSender) {
      rightButtonOptions.name = 'Invitacion enviada';
      rightButtonOptions.onClick = null;
      rightButtonOptions.disabled = true;
    }

    if (connection) {
      rightButtonOptions.name = 'Mensaje';
      rightButtonOptions.onClick = null;
    }

    return (
      <>
        <Button className={`connect ${isMyProfile ? 'invisible' : ''}`} type="button" onClick={rightButtonOptions.onClick} disabled={rightButtonOptions.disabled}>
          { invitationSender && <FontAwesomeIcon className="icon" icon={faCheck} />}
          {rightButtonOptions.name}
        </Button>
      </>
    );
  };


  return (
    <div className="profile-header">
      {coverUrl && <img src={coverUrl} alt="Cover" className="cover-image" />}
      <div className={`cover-add-container ${coverUrl ? '' : 'full-cover'}`}>
        {isMyProfile && (
        <>
          <FontAwesomeIcon className="cover-add-icon" icon={faCamera} />
          <p className="cover-add-text">{coverUrl ? 'Cambia tu cover foto' : 'Sube tu cover foto'}</p>
        </>
        )}
      </div>
      {isMyProfile && <input className="cover-image-input" onChange={coverChanged} type="file" accept="image/*" />}
      <div className="profile-image-container">
        <img src={profileUrl || defaultImage} alt="Avatar" className="profile-image" />
        { isMyProfile && <input className="profile-image-input" onChange={avatarChanged} type="file" accept="image/*" />}
      </div>
      <div className="profile-action-area">
        <Button className={`connect ${!isMyProfile ? 'invisible' : ''}`} type="button">Mis Conexiones</Button>
        <h3 className="profile-header-title">{name}</h3>
        {getRightButton()}
      </div>
      <Modal visible={modal.visible} message={modal.message} close={() => setModal({ visible: false })} actions={modal.actions} />
    </div>
  );
}

ProfileHeader.propTypes = {
  name: PropTypes.string.isRequired,
  profileUrl: PropTypes.string.isRequired,
  coverUrl: PropTypes.string.isRequired,
  isMyProfile: PropTypes.bool,
};

ProfileHeader.defaultProps = {
  isMyProfile: false,
};

export default ProfileHeader;
