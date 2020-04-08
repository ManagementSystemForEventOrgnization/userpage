import { combineReducers } from 'redux';
import user from './user.reducer';
import event from './event.reducer';


export default combineReducers({
  user,
  event
})