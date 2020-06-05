import { createStore } from 'redux';
import reducers from '../reducers';

const store = createStore(
  reducers,
);

const { getState, dispatch } = store;

const getAuthorization = () => getState().session.token;

export default store;

export {
  getState,
  dispatch,
  getAuthorization,
};
