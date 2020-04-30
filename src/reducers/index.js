import { combineReducers } from 'redux';
import { session } from './sessionReducer';


const reducers = combineReducers({
  session,
});

export default reducers;
