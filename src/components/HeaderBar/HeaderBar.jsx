import React from 'react';
import { Link } from 'react-router-dom';
import i18n from 'i18next';

import './HeaderBar.scss';

function HeaderBar() {
  return (
    <header className="header">
      <Link class="homeLink" to="/">{i18n.t('GLEXTRADE')}</Link>
      <nav>
        <ul>
          <li>
            <Link to="/about">{i18n.t('ABOUT')}</Link>
          </li>
          <li>
            <Link to="/sign_up">{i18n.t('SIGN_UP_YOUR_COMPANY')}</Link>
          </li>
          <li>
            <Link to="/sign_in">{i18n.t('SIGN_IN')}</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default HeaderBar;
