import { get, has } from 'lodash';

//import { authUser, forgotPassword } from '../../api';
import { appConsts } from '../../constants';

//import OhLogoWhite from '../../../assets/images/OhLogoWhite/OhLogoWhite.png';

const {
  rdRecurringTypeSelectReducer,
  rdRecurringEndDateTypeSelectReducer,
  txtRecurringDateSetReducer,

  //addCall,

  addTodo,
  doneTodo,

  authFail,
  authStart,
  authSuccess,
  clearAuthErr,
  clearUser,
  setLoginData,
  clearLoginData,
  forgotPasswordStart,
  forgotPasswordFail,
  forgotPasswordSuccess,
  forgotPasswordResetData,
  authWithSAML,
  refreshToken,
} = appConsts;

export const addCallActions = {

  onRecurringTypeSelect(type) {
    console.log(type);
    return (dispatch) => {
      console.log("onRecurringTypeSelect pressed: ", type);
      dispatch({
        type: rdRecurringTypeSelectReducer,
        recurringType: type,
      });
    };
  },

  rdRecurringEndDateSelect(rdEndDate) {
    console.log(rdEndDate);
    return (dispatch) => {
      console.log("rdRecurringEndDateSelect pressed: ", rdEndDate);
      dispatch({
        type: rdRecurringEndDateTypeSelectReducer,
        rdEndDate: rdEndDate,
      });
    };
  },

  recurringDateSelect(year, month, day) {
    console.log(year, month, day);
    return (dispatch) => {
      console.log("recurringDateSelect pressed: ", year, month, day);
      dispatch({
        type: txtRecurringDateSetReducer,
        recurringDate: new Date(year, month, day),
      });
    };
  },





  onAddPress(navigation, task) {
    return (dispatch) => {
      // let todos = this.state.todos;
      // todos.push({task: task});
      // this.setState({
      //   todos: todos
      // });
      dispatch({
        type: addTodo,
        task: task
      });
      console.log('A task was added: ', task);
      navigation.goBack();
    };
  },

  onDone(todo) {
    return (dispatch) => {
      console.log("onDone pressed: ", todo);
      // let filteredTodos = this.state.todos.filter((fTodo) => {
      //   return fTodo !== todo; 
      // });
      // this.setState({ todos: filteredTodos });
      dispatch({
        type: doneTodo,
        todo: todo,
      });
    };
  },

  onToggle() {
    return (dispatch) => {
      dispatch({
        type: 'TOGGLE_STATE',
      });
    };
  },

};
