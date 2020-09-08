import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faCheck } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import './ProfileHeader.scss';
import defaultImage from '../../assets/images/default_avatar.jpg';
import {
  uploadProfilePicture, uploadCoverPicture, removeProfilePicture, removeCoverPicture,
} from '../../actions/user';
import Modal from '../Modal/Modal';
import { connect } from '../../actions/company';
import Button from '../Button/Button';
import { dispatch } from '../../config/store';
import { setActiveChat } from '../../actions/reducers/chat';
import propTypes from '../../tools/propTypes';

function ProfileHeader(props) {
  const {
    company, name, profileUrl, coverUrl, isMyProfile, setCompany,
    session, history, editingProfile, editProfile, saveProfile,
  } = props;

  const currentUser = session.user;
  const currentCompany = currentUser.company;

  const [modal, setModal] = useState({
    visible: false,
  });

  const [loading, setLoading] = useState(false);

  const profilePictureRef = useRef(null);
  const coverPictureRef = useRef(null);

  const connectWithCompany = () => {
    connect(company._id).then((response) => {
      // eslint-disable-next-line no-empty
      if (response.error) {} else {
        setCompany(response);
      }
    });
  };

  const connectDialog = () => {
    setModal({
      visible: true,
      message: `${i18n.t('INVITATION_CONNECT_VERIFICATION')} ${company.name}?`,
      actions: [{
        name: i18n.t('SEND'),
        onClick: connectWithCompany,
      }],
    });
  };

  const sendMessage = () => {
    const { ourRelation = {} } = company;
    const { relation = {} } = ourRelation;
    const { chatRoom } = relation;
    chatRoom.company = { ...company, ...{ ourRelation: null } };
    chatRoom.newMessages = [];
    dispatch(setActiveChat(chatRoom));
  };

  const onClickImage = (imageType) => {
    const modal = {
      visible: true,
    };

    switch (imageType) {
      case 'profile':
        modal.message = i18n.t('PROFILE_PICTURE');
        if (isMyProfile) {
          modal.actions = [{
            name: i18n.t('DELETE_PICTURE'),
            onClick: removeProfilePicture,
          }, {
            name: i18n.t('CHANGE_PICTURE'),
            onClick: () => {
              profilePictureRef.current.click();
            },
          }];
        }
        modal.children = <img className="big-profile-image" src={profileUrl || defaultImage} />;
        break;
      case 'cover':
        modal.message = i18n.t('COVER_PICTURE');
        if (isMyProfile) {
          modal.actions = [{
            name: i18n.t('DELETE_PICTURE'),
            onClick: removeCoverPicture,
          }, {
            name: i18n.t('CHANGE_PICTURE'),
            onClick: () => {
              coverPictureRef.current.click();
            },
          }];
        }
        modal.children = <img className="big-profile-image" src={coverUrl || defaultImage} />;
        break;
    }

    setModal(modal);
  };

  const onClickProfile = () => {
    onClickImage('profile');
  };

  const onClickCover = () => {
    onClickImage('cover');
  };

  const avatarChanged = async (event) => {
    setLoading(true);

    const { files } = event.target;
    const file = files[0];

    if (file) {
      const { name, type } = file;

      await uploadProfilePicture({
        name,
        type,
        file,
      });
    }

    setLoading(false);
  };

  const coverChanged = async (event) => {
    setLoading(true);

    const { files } = event.target;
    const file = files[0];

    if (file) {
      const { name, type } = file;

      await uploadCoverPicture({
        name,
        type,
        file,
      });
    }

    setLoading(false);
  };

  const getRightButton = () => {
    const { ourRelation = {} } = company;
    const { relation = {} } = ourRelation;
    const { type } = relation;

    const invitationSender = type === 'INVITATION_SEND' && currentCompany._id === relation.sender;
    const connection = type === 'CONNECTED';

    const rightButtonOptions = {};

    if (isMyProfile) {
      if (editingProfile) {
        rightButtonOptions.name = i18n.t('SAVE');
        rightButtonOptions.onClick = () => {
          editProfile(false);
          saveProfile();
        };
      } else {
        rightButtonOptions.name = i18n.t('EDIT_PROFILE');
        rightButtonOptions.onClick = () => {
          editProfile(true);
        };
      }
    } else {
      rightButtonOptions.name = i18n.t('INVITATION_SEND');
      rightButtonOptions.onClick = connectDialog;

      if (invitationSender) {
        rightButtonOptions.name = i18n.t('INVITATION_SENT');
        rightButtonOptions.onClick = null;
        rightButtonOptions.disabled = true;
      }

      if (connection) {
        rightButtonOptions.name = i18n.t('MESSAGE');
        rightButtonOptions.onClick = sendMessage;
      }
    }

    return (
      <>
        <Button className="connect" type="button" onClick={rightButtonOptions.onClick} disabled={rightButtonOptions.disabled}>
          { invitationSender && <FontAwesomeIcon className="icon" icon={faCheck} />}
          {rightButtonOptions.name}
        </Button>
      </>
    );
  };

  const leftButtonOptions = {
    name: i18n.t('MY_CONNECTIONS'),
    onClick: () => history.push('my_connections'),
  };

  return (
    <div className="profile-header">
      <div className="cover-area">
        {coverUrl && <img src={coverUrl} alt="Cover" className="cover-image" />}
        <div className={`cover-add-container ${coverUrl ? '' : 'full-cover'}`} onClick={onClickCover}>
          {isMyProfile && (
          <>
            <FontAwesomeIcon className="cover-add-icon" icon={faCamera} />
            <p className="cover-add-text">{coverUrl ? i18n.t('CHANGE_COVER_PICTURE') : i18n.t('UPLOAD_COVER_PICTURE')}</p>
          </>
          )}
        </div>
        {isMyProfile && <input ref={coverPictureRef} className="cover-image-input" onChange={coverChanged} type="file" accept="image/*" />}
        <div className="profile-image-container">
          <img src={profileUrl || defaultImage} alt="Avatar" className="profile-image" onClick={onClickProfile} />
          { isMyProfile && <input ref={profilePictureRef} className="profile-image-input" onChange={avatarChanged} type="file" accept="image/*" />}
        </div>
        { loading && <div className="loader profile-header-loader" /> }
      </div>
      <div className="profile-action-area">
        <Button className={`connect ${!isMyProfile ? 'invisible' : ''}`} type="button" onClick={leftButtonOptions.onClick}>{leftButtonOptions.name}</Button>
        <h3 className="profile-header-title">{name}</h3>
        {getRightButton()}
      </div>
      <Modal
        visible={modal.visible}
        message={modal.message}
        close={() => setModal({ visible: false })}
        actions={modal.actions}
      >
        {modal.children}
      </Modal>
    </div>
  );
}

ProfileHeader.propTypes = {
  ...propTypes.ScreenProptypes,
  name: PropTypes.string.isRequired,
  profileUrl: PropTypes.string.isRequired,
  coverUrl: PropTypes.string,
  isMyProfile: PropTypes.bool,
  company: propTypes.company.isRequired,
  setCompany: PropTypes.func.isRequired,
  session: propTypes.session,
};

ProfileHeader.defaultProps = {
  coverUrl: null,
  isMyProfile: false,
  session: null,
};

export default ProfileHeader;
