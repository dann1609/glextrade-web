import React from 'react';
import i18n from 'i18next';

import './SignIn.scss';
import SignInForm from '../../components/SignInForm/SignInForm';

function SignIn() {
  return (
    <div className="sign-in">
      <div className="sign-in-1">
        <SignInForm className="sign-in-form" />
      </div>
    </div>
  );
}

export default SignIn;
