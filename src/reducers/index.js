import { combineReducers } from 'redux';
import { session } from './sessionReducer';
import { chat } from './chatReducer';


const reducers = combineReducers({
  session,
  chat,
});

export default reducers;
