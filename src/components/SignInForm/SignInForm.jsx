import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  Redirect, withRouter,
} from 'react-router-dom';
import TextInput from '../TextInput/TextInput';

import './SignInForm.scss';
import { signIn } from '../../actions/user';
import i18n from 'i18next';

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

    handleSubmit = async (event) => {
      event.preventDefault();
      const {
        password, email,
      } = this.state;
      const response = await signIn({
        password, email,
      });
      if (response.error) {

      } else {
        this.props.history.push('profile');
      }
    };

   onChange=(type, value) => {
     this.setState({
       [type]: value,
     });
   };

   render() {
     const {
       navigate, password, email, passwordError, emailError,
     } = this.state;
     const disabled = !(password && email);
     const { className } = this.props;
     if (navigate) {
       return <Redirect to="/profile" />;
     }

     return (
       <form className={`sign-up-form-container ${className} }`} onSubmit={this.handleSubmit}>
         <TextInput className="sign-up-textInput" label="Correo Electronico" type="email" onChange={(value) => this.onChange('email', value)} />
         <TextInput className="sign-up-textInput" label="Clave" type="password" onChange={(value) => this.onChange('password', value)} />
         <input className="sign-up-submit" value="Ingresa" type="submit" disabled={disabled} />
       </form>
     );
   }
}

export default compose(withRouter, connect(null, null))(SignInForm);
