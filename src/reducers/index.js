import { combineReducers } from 'redux';
import { session } from './sessionReducer';
import { chat } from './chatReducer';
import { notifications } from './notificationsReducer';

const reducers = combineReducers({
  session,
  chat,
  notifications,
});

export default reducers;
