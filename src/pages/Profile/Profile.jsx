import React, { useEffect, useRef, useState } from 'react';
import {
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import i18n from 'i18next';

import './Profile.scss';
import ProfileField from '../../components/ProfileField/ProfileField';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import countryList from '../../tools/countries';
import industryList from '../../tools/industries';
import companyTypes from '../../tools/companyTypes';
import propTypes from '../../tools/propTypes';
import {
  getCompanyById, removeExtraPicture, removeProfileVideo, updateCompany, uploadExtraPicture, uploadProfileVideo,
} from '../../actions/company';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';

const isProfileScreen = (props) => props.match.path === '/profile';

const getProfileUser = (props) => {
  const { session } = props;

  if (isProfileScreen(props)) {
    return session.user;
  }
  return {};
};

function Profile(props) {
  const { session, history } = props;

  const user = getProfileUser(props);
  const [company, setCompany] = useState(user.company);
  const isMyProfile = session.user && company && session.user.company._id === company._id;

  const [loadingVideo, setLoadingVideo] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedCompany, setEditedCompany] = useState({});
  const [extraIndex, setExtraIndex] = useState(0);
  const [loadingExtra, setLoadingExtra] = useState(false);
  const [modal, setModal] = useState({
    visible: false,
  });


  const profileVideoRef = useRef(null);
  const extraImageRef = useRef(null);

  const getDefaultVideo = () => {
    if (isMyProfile) {
      return 'https://pruebaglextrade.s3.amazonaws.com/video_introduccion_glextrade_perfil_espanol.mp4';
    }
  };


  useEffect(() => {
    if (!company) {
      const { match } = props;
      getCompanyById(match.params.id).then((response) => {
        if (!response.error) {
          setCompany(response);
        }
      });
    } else if (user._id) {
      setCompany(user.company);
    }
  });


  if (!session.token) {
    return <Redirect to="/sign_in" />;
  }

  if (!company) {
    return (
      <div className="profile" />
    );
  }

  const videoChanged = async (event) => {
    setLoadingVideo(true);

    const { files } = event.target;
    const file = files[0];

    if (file) {
      const { name, type } = file;

      await uploadProfileVideo({
        name,
        type,
        file,
      });
    }

    setLoadingVideo(false);
  };

  const onAddExtraImage = async (event) => {
    const { files } = event.target;
    const file = files[0];

    if (file) {
      setLoadingExtra(true);
      const { name, type } = file;

      await uploadExtraPicture({
        name,
        type,
        file,
      });
      setLoadingExtra(false);
    }
  };

  const removeVideo = async () => {
    await removeProfileVideo();
  };

  const replaceVideo = () => {
    profileVideoRef.current.click();
  };

  const addExtraImage = () => {
    extraImageRef.current.click();
  };

  const {
    name, country, industry, type, phone, website, profileUrl, coverUrl, videoUrl,
  } = company || {};

  const countryObject = _.find(countryList, { code: country });
  const countryName = countryObject && countryObject.es;

  const industryObject = _.find(industryList, { code: industry });
  const industryName = industryObject && industryObject.es;

  const typeObject = _.find(companyTypes, { code: type });
  const typeName = typeObject && typeObject.es;

  const uploadingVideo = () => loadingVideo || company.uploadingVideo;

  const onChange = (type, value) => {
    const newState = { [type]: value };
    setEditedCompany({ ...editedCompany, ...newState });
  };

  const saveProfile = () => {
    if (Object.keys(editedCompany).length > 0) {
      updateCompany(editedCompany);
      setEditedCompany({});
    }
  };

  const renderMiniatures = () => {
    const extraImages = company.extraUrl.length;

    const toRender = [...company.extraUrl];

    for (let i = 0; i < 6 - extraImages; i++) {
      toRender.push({});
    }

    return toRender.map((miniature, index) => {
      const setIndex = () => {
        if (miniature.url) {
          setExtraIndex(index);
        }
      };

      const removeExtra = () => {
        setLoadingExtra(true);
        removeExtraPicture(index).then(() => {
          setLoadingExtra(false);
        });
        setModal({
          visible: false,
        });
      };

      const openRemoveExtraDialog = () => {
        setModal({
          visible: true,
          message: `${i18n.t('REMOVE_EXTRA_MESSAGE')}`,
          actions: [{
            name: i18n.t('REMOVE'),
            onClick: removeExtra,
          }],
        });
      };

      if (miniature.url) {
        return (
          <div className="mini-extra-container">
            <img src={miniature.url} className="mini-extra-image" onClick={setIndex} />
            <span className="mini-extra-remove" onClick={openRemoveExtraDialog} role="button" tabIndex="0">&times;</span>
          </div>
        );
      }
      return (
        <div className="mini-extra-container" />
      );
    });
  };

  const renderImageContainer = () => {
    if (!isMyProfile && !company.extraUrl?.length) {
      return null;
    }

    const extraLength = company.extraUrl.length;

    if (extraLength > 0 && extraIndex >= extraLength) {
      setExtraIndex(extraLength - 1);
    }

    const extra = company.extraUrl[extraIndex];

    const next = () => {
      if (extraIndex < extraLength - 1) {
        setExtraIndex(extraIndex + 1);
      } else {
        setExtraIndex(0);
      }
    };

    const prev = () => {
      if (extraIndex > 0) {
        setExtraIndex(extraIndex - 1);
      } else {
        setExtraIndex(extraLength - 1);
      }
    };

    return (
      <div className="profile-extra-container">
        <div className="profile-extra-image-container">
          {extra && <img src={extra?.url} className="extra-image" onClick={addExtraImage} />}
          <a className="extra-prev" onClick={prev}>&#10094;</a>
          <a className="extra-next" onClick={next}>&#10095;</a>
          {company.extraUrl.length == 0 && <p className="extra-image-pretext" onClick={addExtraImage}>{i18n.t('UPLOAD_EXTRA_PICTURES')}</p>}
          { loadingExtra && <div className="loader extra-image-loader" /> }
        </div>
        <div className="extra-mini-container">{renderMiniatures()}</div>
        {company.extraUrl.length < 6 && <Button className="extra-actions" onClick={addExtraImage}>{i18n.t('ADD_EXTRA')}</Button>}
        <input ref={extraImageRef} className="extra-input" onChange={onAddExtraImage} type="file" accept="image/*" />
      </div>
    );
  };

  return (
    <div className="profile">
      <ProfileHeader
        company={company}
        setCompany={setCompany}
        name={name}
        profileUrl={profileUrl}
        coverUrl={coverUrl}
        isMyProfile={isMyProfile}
        session={session}
        history={history}
        editingProfile={editing}
        editProfile={setEditing}
        saveProfile={saveProfile}
      />
      <div className="profile-content">
        <section className="profile-data-section">
          <ProfileField label={i18n.t('COMPANY_NAME')} value={name} contentEditable={editing} onChange={(value) => onChange('name', value)} />
          <ProfileField label={i18n.t('INDUSTRY')} value={industryName} />
          <ProfileField label={i18n.t('COUNTRY')} value={countryName} />
          <ProfileField label={i18n.t('COMPANY_TYPE')} value={typeName} />
          <ProfileField label={i18n.t('PHONE')} value={phone} contentEditable={editing} onChange={(value) => onChange('phone', value)} />
          <ProfileField label={i18n.t('WEBSITE')} value={website} contentEditable={editing} onChange={(value) => onChange('website', value)} />
        </section>
        <section className="profile-video-section">
          <div className="profile-video-container">
            { !(videoUrl)
        && <p className="profile-video-pretext" onClick={replaceVideo}>{ isMyProfile ? i18n.t('UPLOAD_VIDEO') : i18n.t('NO_VIDEO')}</p>}
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video key={videoUrl} className="profile-video" controls>
              <source src={videoUrl} />
              Your browser does not support HTML video.
            </video>
          </div>
          { uploadingVideo() && <div className="loader profile-video-loader" /> }
          { isMyProfile && (
          <div className="profile-video-actions-container">
            <Button className="profile-video-actions" onClick={removeVideo}>{i18n.t('DELETE_VIDEO')}</Button>
            <input ref={profileVideoRef} className="profile-video-input" onChange={videoChanged} type="file" accept="video/*" />
            <Button className="profile-video-actions" onClick={replaceVideo}>{i18n.t('UPDATE_VIDEO')}</Button>
          </div>
          )}
          { renderImageContainer()}
        </section>
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

Profile.propTypes = {
  ...propTypes.ScreenProptypes,
  session: propTypes.session,
};

Profile.defaultProps = {
  session: null,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(mapStateToProps)(Profile);
