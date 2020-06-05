import React, { useState, useEffect } from 'react';
import {
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';

import './Companies.scss';
import i18n from 'i18next';
import { getCompanies } from '../../actions/company';
import propTypes from '../../tools/propTypes';
import CompanyCardProfile from '../../components/CompanyCardProfile/CompanyCardProfile';


function Companies(props) {
  const { session } = props;

  const [page] = useState(0);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    getCompanies().then((response) => {
      if (!response.error) {
        setCompanies(response.companies);
      }
    });
  }, [page]);

  const goToCompanyProfile = (id) => {
    if (session.token) {
      props.history.push(`companies/${id}`);
    }
  };

  const renderList = () => companies.map(
    (item) => (
      <CompanyCardProfile
        key={item._id}
        company={item}
        onClick={() => goToCompanyProfile(item._id)}
      />
    ),
  );

  return (
    <div className="companies">
      <section className="companies-1">
        <p className="companies-1-paragraph">{i18n.t('COMPANIES_PARAGRAPH_1')}</p>
      </section>
      <section className="company-list">
        {renderList()}
      </section>
    </div>
  );
}

Companies.propTypes = {
  session: propTypes.session,
  history: propTypes.ReactRouterHistory.isRequired,
};

Companies.defaultProps = {
  session: null,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(mapStateToProps)(Companies);
