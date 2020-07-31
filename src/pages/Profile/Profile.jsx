import React, { useEffect, useState } from 'react';
import {
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

import './Profile.scss';
import ProfileField from '../../components/ProfileField/ProfileField';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import countryList from '../../tools/countries';
import industryList from '../../tools/industries';
import companyTypes from '../../tools/companyTypes';
import propTypes from '../../tools/propTypes';
import { getCompanyById, updateCompany, uploadProfileVideo } from '../../actions/company';

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

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedCompany, setEditedCompany] = useState({});

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
    setLoading(true);

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

    setLoading(false);
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

  const loadingVideo = () => loading || company.uploadingVideo;

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
          <ProfileField label="Nombre de la empresa" value={name} />
          <ProfileField label="Industria" value={industryName} />
          <ProfileField label="País" value={countryName} />
          <ProfileField label="Tipo de empresa" value={typeName} />
          <ProfileField label="Teléfono" value={phone} contentEditable={editing} onChange={(value) => onChange('phone', value)} />
          <ProfileField label="Página web" value={website} contentEditable={editing} onChange={(value) => onChange('website', value)} />
        </section>
        <section className="profile-video-section">
          <div className="profile-video-container">
            { !(videoUrl || getDefaultVideo())
        && <p className="profile-video-pretext">{ isMyProfile ? 'Sube aqui tu video de 30 segundos' : 'No hay video disponible'}</p>}
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video key={videoUrl || getDefaultVideo()} className="profile-video" controls>
              <source src={videoUrl || getDefaultVideo()} />
              Your browser does not support HTML video.
            </video>
          </div>
          { loadingVideo() && <div className="loader profile-video-loader" /> }
          { isMyProfile && <input className="profile-video-input" onChange={videoChanged} type="file" accept="video/*" />}
        </section>
      </div>
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
