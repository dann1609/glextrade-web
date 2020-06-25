import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import i18n from 'i18next';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import './HeaderBar.scss';
import propTypes from '../../tools/propTypes';

function HeaderBar(props) {
  const { session, notifications } = props;
  const signedIn = session.token;

  const pendingNotifications = notifications.reduce((total, notification) => {
    if (!notification.seen) {
      return total + 1;
    }
    return total;
  }, 0);

  return (
    <header>
      <div className="header">
        <Link className="homeLink" to="/">{i18n.t('GLEXTRADE')}</Link>
        <nav>
          <ul>
            <li>
              <Link to="/about">{i18n.t('ABOUT')}</Link>
            </li>
            {!signedIn
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
            {signedIn
          && (
          <>
            <li>
              <Link to="/companies">{i18n.t('SEARCH_COMPANY')}</Link>
            </li>
            <li>
              <Link className="bell-icon-link" to="/notifications">
                <FontAwesomeIcon className="sub-home-icon" icon={faBell} />
                {pendingNotifications}
              </Link>
            </li>
            <li>
              <Link to="/profile">{i18n.t('PROFILE')}</Link>
            </li>
          </>
          )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

HeaderBar.propTypes = {
  session: propTypes.session,
  notifications: PropTypes.arrayOf(PropTypes.shape({

  })),
};

HeaderBar.defaultProps = {
  session: null,
  notifications: [],
};

const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(mapStateToProps)(HeaderBar);
