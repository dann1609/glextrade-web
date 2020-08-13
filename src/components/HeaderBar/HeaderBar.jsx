import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import i18n from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import './HeaderBar.scss';
import propTypes from '../../tools/propTypes';
import { signOut } from '../../actions/user';

function HeaderBar(props) {
  const { session, notifications } = props;
  const signedIn = session.token;

  const pendingNotifications = notifications.notificationsList.reduce((total, notification) => {
    if (!notification.seen) {
      return total + 1;
    }
    return total;
  }, 0);

  const logout = () => {
    signOut();
    props.history.push('');
  };

  return (
    <header>
      <div className="header">
        <Link className="homeLink" to="/">{i18n.t('GLEXTRADE')}</Link>
        <nav>
          <ul>
            <li>
              <Link to="/about">{i18n.t('ABOUT')}</Link>
            </li>
            <li>
              <Link to="/companies">{i18n.t('SEARCH_COMPANY')}</Link>
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
                  <Link className="bell-icon-link" to="/notifications">
                    <FontAwesomeIcon className="sub-home-icon" icon={faBell} />
                    {pendingNotifications + notifications.newNotifications}
                  </Link>
                </li>
                <li className="profile-option">
                  <Link to="/profile">{i18n.t('PROFILE')}</Link>
                  <div className="dropdown-content">
                    <h4 className="logout-option" onClick={logout}>Salir</h4>
                  </div>
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
  ...propTypes.ScreenProptypes,
  session: propTypes.session,
  notifications: propTypes.notifications,
};

HeaderBar.defaultProps = {
  session: null,
  notifications: {

  },
};

const mapStateToProps = (state) => ({
  session: state.session,
  notifications: state.notifications,
});

export default compose(withRouter, connect(mapStateToProps))(HeaderBar);
