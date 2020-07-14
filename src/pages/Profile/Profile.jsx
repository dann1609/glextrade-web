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
import { uploadVideo } from '../../actions/user';
import propTypes from '../../tools/propTypes';
import { getCompanyById } from '../../actions/company';

const videoChanged = (event) => {
  const { files } = event.target;
  const file = files[0];

  if (file) {
    const { name, type } = file;

    uploadVideo({
      name,
      type,
      file,
    });
  }
};

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

  const {
    name, country, industry, type, phone, website, profileUrl, coverUrl, videoUrl,
  } = company || {};

  const countryObject = _.find(countryList, { code: country });
  const countryName = countryObject && countryObject.es;

  const industryObject = _.find(industryList, { code: industry });
  const industryName = industryObject && industryObject.es;

  const typeObject = _.find(companyTypes, { code: type });
  const typeName = typeObject && typeObject.es;

  return (
    <div className="profile">
      <section className="profile-data-section">
        <ProfileHeader
          company={company}
          setCompany={setCompany}
          name={name}
          profileUrl={profileUrl}
          coverUrl={coverUrl}
          isMyProfile={isMyProfile}
          session={session}
          history={history}
        />
        <ProfileField label="Nombre de la empresa" value={name} />
        <ProfileField label="Industria" value={industryName} />
        <ProfileField label="País" value={countryName} />
        <ProfileField label="Tipo de empresa" value={typeName} />
        <ProfileField label="Teléfono" value={phone} />
        <ProfileField label="Website" value={website} />
      </section>
      <section className="profile-video-section">
        <div className="profile-video-container">
          { !videoUrl
        && <p className="profile-video-pretext">{ isMyProfile ? 'Sube aqui tu video de 30 segundos' : 'No hay video disponible'}</p>}
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video key={videoUrl} className="profile-video" controls>
            <source src={videoUrl} />
            Your browser does not support HTML video.
          </video>
        </div>
        { isMyProfile && <input className="profile-video-input" onChange={videoChanged} type="file" accept="video/*" />}
      </section>
    </div>
  );
}

Profile.propTypes = {
  ...propTypes.ScreenProptypes,
  ...{
    session: propTypes.session,
  },
};

Profile.defaultProps = {
  session: null,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(mapStateToProps)(Profile);
