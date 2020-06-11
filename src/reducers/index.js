import { combineReducers } from 'redux';
import user from './user.reducer';
import event from './event.reducer';
// import applyEvent from './applyEvent.reducer';

export default combineReducers({
  user,
  event,
});
