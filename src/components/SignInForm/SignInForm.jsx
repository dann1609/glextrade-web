import React, { Component } from 'react';
import {
  Redirect, withRouter,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import './SignInForm.scss';
import { signIn } from '../../actions/user';
import TextInput from '../TextInput/TextInput';
import propTypes from '../../tools/propTypes';

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

    handleSubmit = async (event) => {
      event.preventDefault();
      const { history } = this.props;
      const {
        password, email,
      } = this.state;
      const response = await signIn({
        password, email,
      });
      if (response.error) {
        //
      } else {
        history.push('profile');
      }
    };

   onChange=(type, value) => {
     this.setState({
       [type]: value,
     });
   };

   render() {
     const {
       navigate, password, email,
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

SignInForm.propTypes = {
  className: PropTypes.string,
  history: propTypes.history.isRequired,
};

SignInForm.defaultProps = {
  className: '',
};

export default withRouter(SignInForm);
