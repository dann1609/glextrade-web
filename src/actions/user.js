import UsersApi from '../api/usersApi';
import store from '../config/store';
import { setSession } from './reducers/session';

export async function signUp(query) {
  const {
    name, country, industry, type, email, password, phone,
  } = query || {};

  const response = await UsersApi.registerUser({
    name,
    country,
    industry,
    type,
    email,
    password,
    phone,
  });

  if (response.token) {
    store.dispatch(setSession(response));
    return response;
  }

  return response;
}

export async function signIn(query) {
  const { email, password } = query || {};

  const response = await UsersApi.loginUser({
    email,
    password,
  });

  if (response.token) {
    store.dispatch(setSession(response));
    return response;
  }

  return response;
}
