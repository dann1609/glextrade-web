import { sessionType } from '../../reducers/sessionReducer';

export const setSession = (session) => ({
  type: sessionType.SET_SESSION,
  session,
});

export const resetSession = () => ({
  type: sessionType.CLEAR_SESSION,
});
