import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';

const store = createStore(
  reducers,
);

const { getState, dispatch } = store;

export default store;

export {
  getState,
  dispatch,
};
