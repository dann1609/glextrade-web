import React from 'react';
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

function Profile(props) {
  const { session } = props;
  const { user } = session || {};
  const { company } = user || {};
  const {
    name, country, industry, type, phone, website, profileUrl, coverUrl, videoUrl,
  } = company || {};

  if (!session.token) {
    return <Redirect to="/sign_in" />;
  }

  const countryObject = _.find(countryList, { code: country });
  const countryName = countryObject && countryObject.es;

  const industryObject = _.find(industryList, { code: industry });
  const industryName = industryObject && industryObject.es;

  const typeObject = _.find(companyTypes, { code: type });
  const typeName = typeObject && typeObject.es;

  const videoChanged = (event) => {
    const { files } = event.target;
    const file = files[0];

    console.log(file);

    if (file) {
      const { name, type } = file;

      uploadVideo({
        name,
        type,
        file,
      });
    }
  };

  return (
    <div className="profile">
      <section className="profile-data-section">
        <ProfileHeader name={name} profileUrl={profileUrl} coverUrl={coverUrl} />
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
        && <p className="profile-video-pretext">Sube aqui tu video de 30 segundos</p>}
          <video key={videoUrl} className="profile-video" controls>
            <source src={videoUrl} />
            Your browser does not support HTML video.
          </video>
        </div>
        <input className="profile-video-input" onChange={videoChanged} type="file" accept="video/*" />

      </section>
    </div>
  );
}

const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(mapStateToProps)(Profile);
