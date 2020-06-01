import React, { useState, useEffect } from 'react';
import {
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

import './Companies.scss';
import i18n from 'i18next';
import { getCompanies } from '../../actions/company';

import countryList from '../../tools/countries';
import industryList from '../../tools/industries';
import companyTypes from '../../tools/companyTypes';
import defaultImage from '../../assets/images/default_avatar.jpg';


function Companies(props) {
  const { session } = props;

  const [page, setPage] = useState(0);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    getCompanies().then((response) => {
      if (!response.error) {
        setCompanies(response.companies);
      }
    });
  }, [page]);

  if (!session.token) {
    return <Redirect to="/sign_in" />;
  }

  const CompanyCardProfile = (props) => {
    const { company } = props;
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
      <div className="card-container">
        <div className="card">
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

  const renderList = () => companies.map((item) => <CompanyCardProfile key={item.id} company={item} />);

  return (
    <div className="companies">
      <section className="companies-1">
        <p className="companies-1-paragraph">{i18n.t('COMPANIES_PARAGRAPH_1')}</p>
      </section>
      <section className="companyList">
        {renderList()}
      </section>
    </div>
  );
}

const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(mapStateToProps)(Companies);
