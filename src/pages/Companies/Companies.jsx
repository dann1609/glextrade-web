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

  if (!session.token) {
    return <Redirect to="/sign_in" />;
  }

  const renderList = () => companies.map(
    (item) => <CompanyCardProfile key={item.id} company={item} />,
  );

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

Companies.propTypes = {
  session: propTypes.session,
};

Companies.defaultProps = {
  session: null,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(mapStateToProps)(Companies);
