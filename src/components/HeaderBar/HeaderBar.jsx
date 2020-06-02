import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import i18n from 'i18next';

import './HeaderBar.scss';
import propTypes from '../../tools/propTypes';

function HeaderBar(props) {
  const { session } = props;

  return (
    <header className="header">
      <Link className="homeLink" to="/">{i18n.t('GLEXTRADE')}</Link>
      <nav>
        <ul>
          <li>
            <Link to="/about">{i18n.t('ABOUT')}</Link>
          </li>
          {!session.token
              && (
              <>
                <li>
                  <Link to="/sign_up">{i18n.t('SIGN_UP_YOUR_COMPANY')}</Link>
                </li>
                <li>
                  <Link to="/sign_in">{i18n.t('SIGN_IN')}</Link>
                </li>
              </>
              )}
          {session.token
          && (
          <>
            <li>
              <Link to="/companies">{i18n.t('SEARCH_COMPANY')}</Link>
            </li>
            <li>
              <Link to="/profile">{i18n.t('PROFILE')}</Link>
            </li>
          </>
          )}
        </ul>
      </nav>
    </header>
  );
}

HeaderBar.propTypes = {
  session: propTypes.session,
};

HeaderBar.defaultProps = {
  session: null,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(mapStateToProps)(HeaderBar);
