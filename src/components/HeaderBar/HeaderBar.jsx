import React from 'react';
import './HeaderBar.scss';
import { Link } from 'react-router-dom';
import i18n from 'i18next';

class HeaderBar extends React.Component {
  render() {
    return (
      <header className="header">
        <nav>
          <ul>
            <li>
              <Link to="/">{i18n.t('key')}</Link>
            </li>
            <li>
              <Link to="/about">{i18n.t('WHO_WE_ARE')}</Link>
            </li>
            <li>
              <Link to="/users">{i18n.t('SIGN_UP_YOUR_COMPANY')}</Link>
            </li>
            <li>
              <Link to="/users">{i18n.t('SIGN_IN')}</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default HeaderBar;
