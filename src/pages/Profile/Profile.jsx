import React from 'react';
import i18n from 'i18next';
import {
  Redirect,
} from 'react-router-dom';
import _ from 'lodash';

import './Profile.scss';
import { connect } from 'react-redux';
import { counter } from '@fortawesome/fontawesome-svg-core';
import ProfileField from '../../components/ProfileField/ProfileField';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import countryList from '../../tools/countries';
import industryList from '../../tools/industries';
import companyTypes from '../../tools/companyTypes';

function Profile(props) {
  const { session } = props;
  const { user } = session || {};
  const { company } = user || {};
  const {
    name, country, industry, type, phone, website,
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

  return (
    <div className="profile">
      <section className="profile-data">
        <ProfileHeader name={name} />
        <ProfileField label="Nombre de la empresa" value={name} />
        <ProfileField label="Industria" value={industryName} />
        <ProfileField label="País" value={countryName} />
        <ProfileField label="Tipo de empresa" value={typeName} />
        <ProfileField label="Teléfono" value={phone} />
        <ProfileField label="Website" value={website} />
      </section>
      <section className="profile-video" />
    </div>
  );
}

const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(mapStateToProps)(Profile);
