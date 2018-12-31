import { get, has } from "lodash";

//import { authUser, forgotPassword } from '../../api';
import { appConsts } from "../../constants";

//import OhLogoWhite from '../../../assets/images/OhLogoWhite/OhLogoWhite.png';

const {
  rdRecurringTypeSelectReducer,
  rdRecurringEndDateTypeSelectReducer,
  txtRecurringDateSetReducer,
  weeklyDaysSelectReducer,

  // On Call Save
  onCallSaveSuccessReducer,

  // From call list screen
  editCallReducer,
  callListRefreshReducer,
  callListRefreshFalseReducer,

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
  refreshToken
} = appConsts;

export const addCallActions = {
  onRecurringTypeSelect(type) {
    //console.log(type);
    return dispatch => {
      //console.log("onRecurringTypeSelect pressed: ", type);
      dispatch({
        type: rdRecurringTypeSelectReducer,
        recurringType: type
      });
    };
  },

  rdRecurringEndDateSelect(rdEndDate) {
    //console.log(rdEndDate);
    return dispatch => {
      //console.log("rdRecurringEndDateSelect pressed: ", rdEndDate);
      dispatch({
        type: rdRecurringEndDateTypeSelectReducer,
        rdEndDate: rdEndDate
      });
    };
  },

  recurringDateSelect(date) {
    return dispatch => {
      //console.log("recurringDateSelect pressed: ", date);
      dispatch({
        type: txtRecurringDateSetReducer,
        recurringDate: new Date(date)
      });
    };
  },

  weeklyDaysSelectAction(weeklyDays) {
    //console.log(weeklyDays);
    return dispatch => {
      //console.log("weeklyDaysSelectAction pressed: ", weeklyDays);
      dispatch({
        type: weeklyDaysSelectReducer,
        weeklyDays: weeklyDays
      });
    };
  },

  onCallSaveSuccessAction() {
    return dispatch => {
      //console.log("onCallSaveSuccessAction: ");
      dispatch({
        type: onCallSaveSuccessReducer
      });
    };
  },

  editCallAction(item) {
    return dispatch => {
      //console.log("editCallAction: ", item);
      dispatch({
        type: editCallReducer,
        item: item
      });
    };
  },

  callListRefreshAction() {
    return dispatch => {
      //console.log("callListRefreshAction");
      dispatch({
        type: callListRefreshReducer
      });
    };
  },

  callListRefreshFalseAction() {
    return dispatch => {
      //console.log("callListRefreshFalseAction");
      dispatch({
        type: callListRefreshFalseReducer
      });
    };
  },

  //TASK
  onAddPress(navigation, task) {
    return dispatch => {
      // let todos = this.state.todos;
      // todos.push({task: task});
      // this.setState({
      //   todos: todos
      // });
      dispatch({
        type: addTodo,
        task: task
      });
      //console.log("A task was added: ", task);
      navigation.goBack();
    };
  },

  onDone(todo) {
    return dispatch => {
      //console.log("onDone pressed: ", todo);
      // let filteredTodos = this.state.todos.filter((fTodo) => {
      //   return fTodo !== todo;
      // });
      // this.setState({ todos: filteredTodos });
      dispatch({
        type: doneTodo,
        todo: todo
      });
    };
  },

  onToggle() {
    return dispatch => {
      dispatch({
        type: "TOGGLE_STATE"
      });
    };
  }
};
