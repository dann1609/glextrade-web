import React from 'react';
import { connect } from 'react-redux';

import './MyConnections.scss';
import i18n from 'i18next';
import propTypes from '../../tools/propTypes';
import CompanyCardProfile from '../../components/CompanyCardProfile/CompanyCardProfile';

function MyConnections(props) {
  const { session } = props;
  const { user } = session;
  const { company } = user;
  const { network } = company;

  const goToCompanyProfile = (id) => {
    if (session.token) {
      props.history.push(`companies/${id}`);
    }
  };

  const renderList = () => network.map(
    ({ company }) => (
      <CompanyCardProfile
        key={company._id}
        company={company}
        onClick={() => goToCompanyProfile(company._id)}
      />
    ),
  );

  return (
    <div className="my-connections">
      <section className="my-connections-1">
        <p className="my-connections-1-paragraph">{i18n.t(network.length > 0 ? 'MY_CONNECTIONS_PARAGRAPH_1' : 'MY_CONNECTIONS_PARAGRAPH_0')}</p>
      </section>
      <section className="my-connections-list">
        {renderList()}
      </section>
    </div>
  );
}

MyConnections.propTypes = {
  ...propTypes.ScreenProptypes,
  session: propTypes.session,
};

MyConnections.defaultProps = {
  session: null,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(mapStateToProps)(MyConnections);
