import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  Redirect, withRouter,
} from 'react-router-dom';
import _ from 'lodash';
import i18n from 'i18next';
import TextInput from '../TextInput/TextInput';

import './SignUpForm.scss';
import { signUp } from '../../actions/user';
import SelectInput from '../SelectInput/SelectInput';
import countryList from '../../tools/countries';
import companyTypes from '../../tools/companyTypes';
import industryList from '../../tools/industries';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.countries = _.orderBy(countryList, 'es').map((country) => ({
      label: country.es,
      value: country.code,
      phonePrefix: country.phonePrefix,
    }));
    this.types = _.orderBy(companyTypes, 'es').map((type) => ({
      label: type.es,
      value: type.code,
    }));
    this.industries = _.orderBy(industryList, 'es').map((industry) => ({
      label: industry.es,
      value: industry.code,
    }));
  }

    handleSubmit = async (event) => {
      event.preventDefault();
      const {
        name, country, industry, type, password, password2, email, phone, website,
      } = this.state;
      const response = await signUp({
        name, country, industry, type, password, email, phone,
      });
      if (response.error) {

      } else {
        this.props.history.push('profile');
      }
    };

   onChange=(type, value) => {
     const newState = { [type]: value };
     if (type === 'country') {
       const country = _.find(this.countries, { value });
       newState.phonePrefix = country.phonePrefix;
     }
     this.setState(newState);
   };

   onBlurName=() => {
     const { name, password, email } = this.state;
     if (!name && password) {
       this.setState({ nameError: i18n.t('NAME_REQUIRED') });
     } else {
       this.setState({ nameError: null });
     }
   }

   onBlurCountry=() => {
     const { country } = this.state;
     if (!country) {
       this.setState({ countryError: i18n.t('COUNTRY_REQUIRED') });
     } else {
       this.setState({ countryError: null });
     }
   }

    onBlurIndustry=() => {
      const { industry } = this.state;
      if (!industry) {
        this.setState({ industryError: i18n.t('INDUSTRY_REQUIRED') });
      } else {
        this.setState({ industryError: null });
      }
    }

   onBlurType=() => {
     const { type } = this.state;
     if (!type) {
       this.setState({ typeError: i18n.t('TYPE_REQUIRED') });
     } else {
       this.setState({ typeError: null });
     }
   }

   onBlurPassword=() => {
     const { password = '' } = this.state;

     if (password && password.length < 8) {
       this.setState({ passwordError: i18n.t('PASSWORD_TOO_SHORT') });
     } else {
       this.setState({ passwordError: null });
     }
   }

   onBlurPassword2=() => {
     const { password, password2 } = this.state;
     if (password != password2) {
       this.setState({ password2Error: i18n.t('PASSWORD_DONT_MATCH') });
     } else {
       this.setState({ password2Error: null });
     }
   }

   onBlurEmail=() => {
     const { email } = this.state;

     if (email && !email.match(new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))) {
       this.setState({ emailError: i18n.t('INVALID_EMAIL') });
     } else {
       this.setState({ emailError: null });
     }
   }

   render() {
     const {
       navigate, name, country, industry, type, password, password2, email, phonePrefix, nameError, countryError, industryError, typeError, passwordError, password2Error, emailError,
     } = this.state;
     const error = nameError || countryError || industryError || typeError || passwordError || password2Error || emailError;
     const disabled = !(name && country && industry && type && password && password2 && email && !error);
     const { className } = this.props;
     if (navigate) {
       return <Redirect to="/profile" />;
     }

     return (
       <form className={`sign-up-form-container ${className} }`} onSubmit={this.handleSubmit}>
         <TextInput className="sign-up-textInput" label="Nombre de Empresa" placeholder="Nombre de empresa" onChange={(value) => this.onChange('name', value)} onBlur={this.onBlurName} error={nameError} />
         <SelectInput label="Pais" placeholder="Pais donde se encuentra tu empresa" list={this.countries} onChange={(value) => this.onChange('country', value)} onBlur={this.onBlurCountry} error={countryError} />
         <SelectInput label="Industria" placeholder="Sector al cual pertenece tu empresa" list={this.industries} onChange={(value) => this.onChange('industry', value)} onBlur={this.onBlurIndustry} error={industryError} />
         <SelectInput label="Tipo de empresa" placeholder="Tipo de empresa" list={this.types} onChange={(value) => this.onChange('type', value)} onBlur={this.onBlurType} error={typeError} />
         <TextInput className="sign-up-textInput" label="Clave" placeholder="Crea tu clave" type="password" onChange={(value) => this.onChange('password', value)} onBlur={this.onBlurPassword} error={passwordError} />
         <TextInput className="sign-up-textInput" label="Confirmar Clave" placeholder="Crea tu clave" type="password" onChange={(value) => this.onChange('password2', value)} onBlur={this.onBlurPassword2} error={password2Error} />
         <TextInput className="sign-up-textInput" label="Correo Electronico" placeholder="Tu correo empresarial" type="email" onChange={(value) => this.onChange('email', value)} onBlur={this.onBlurEmail} error={emailError} />
         <TextInput className="sign-up-textInput" label="Telefono" placeholder="Tu telefono de contacto" prefix={phonePrefix ? `+${phonePrefix}` : ''} onChange={(value) => this.onChange('phone', value)} />
         <TextInput className="sign-up-textInput" label="Website" placeholder="Tu pagina Web" onChange={(value) => this.onChange('website', value)} />

         <input className="sign-up-submit" value="Registrar mi empresa" type="submit" disabled={disabled} />
       </form>
     );
   }
}

export default compose(withRouter, connect(null, null))(SignUpForm);
