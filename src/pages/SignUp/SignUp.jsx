import React from 'react';
import i18n from 'i18next';

import './SignUp.scss';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

function SignUp() {
  return (
    <div className="sign-up">
      <div className="sign-up-1">
        <h2 className="sign-up-1-title">{i18n.t('SIGN_UP_TITLE_1')}</h2>
      </div>
      <div className="sign-up-2">
        <SignUpForm className="sign-up-form" />
      </div>
    </div>
  );
}

export default SignUp;
