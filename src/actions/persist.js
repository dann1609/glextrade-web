import { dispatch, getState } from '../config/store';
import { setSession } from './reducers/session';
import StorageApi from '../api/StorageApi';

export function persistSession() {
  const { session } = getState();
  StorageApi.saveSession(session);
}

export function restoreSession() {
  const session = StorageApi.restoreSession();

  console.log(getState());

  if (session) {
    dispatch(setSession(session));
  }
}
