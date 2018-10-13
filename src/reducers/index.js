import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import pollReducer from './poll';

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  pollState: pollReducer,
});

export default rootReducer;