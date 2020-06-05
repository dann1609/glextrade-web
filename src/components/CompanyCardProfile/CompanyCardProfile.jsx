import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import './CompanyCardProfile.scss';
import countryList from '../../tools/countries';
import industryList from '../../tools/industries';
import companyTypes from '../../tools/companyTypes';
import defaultImage from '../../assets/images/default_avatar.jpg';
import propTypes from '../../tools/propTypes';


const CompanyCardProfile = (props) => {
  const { company, onClick } = props;
  const {
    name, country, industry, type, coverUrl, profileUrl,
  } = company;

  const countryObject = _.find(countryList, { code: country });
  const countryName = countryObject && countryObject.es;

  const industryObject = _.find(industryList, { code: industry });
  const industryName = industryObject && industryObject.es;

  const typeObject = _.find(companyTypes, { code: type });
  const typeName = typeObject && typeObject.es;
  return (
    <div className="company-card-container">
      <div className="card" onClick={onClick}>
        <img src={coverUrl} alt="" className="cover-image" />
        <img src={profileUrl || defaultImage} alt="Avatar" className="profile-image" />
        <h3 className="name">{name}</h3>
        <h4 className="property">{typeName}</h4>
        <h4 className="property">{industryName}</h4>
        <h4 className="property">{countryName}</h4>
      </div>
    </div>
  );
};

CompanyCardProfile.propTypes = {
  company: propTypes.company.isRequired,
  onClick: PropTypes.func,
};

CompanyCardProfile.defaultProps = {
  onClick: () => {},
};


export default CompanyCardProfile;
