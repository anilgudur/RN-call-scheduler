import { combineReducers } from 'redux';
import { i18nReducer } from 'react-redux-i18n';
import { callReducer } from './callReducer';

import { userReducer } from './userReducer';
import { taskListReducer } from './taskListReducer';
//import { addTaskReducer } from './addTaskReducer';
// import { roomReducer }  from './roomReducer';
// import { timerReducer }  from './timerReducer';
// import { navigationReducer } from './navigationReducer';

export default combineReducers({
  i18n: i18nReducer,
  call: callReducer,

  user: userReducer,
  task: taskListReducer,

  // user: userReducer,
  // task: taskListReducer,

  //addTask: addTaskReducer,
  // room: roomReducer,
  // navigation: navigationReducer,
  // timer: timerReducer,
});
