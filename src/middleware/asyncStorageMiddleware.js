import { saveState } from '../utils/asyncStorageUtils';
import { appConsts } from '../constants';

export const asyncStorageMiddleware = store => next => action => {
  const returnValue = next(action);

  const {
    // Add Call -> Select Rcurring Type Screen
    rdRecurringTypeSelectReducer,
    rdRecurringEndDateTypeSelectReducer,
    txtRecurringDateSetReducer,
    weeklyDaysSelectReducer,

    // On Call Save
    onCallSaveSuccessReducer,

    // TODO
    addTodo,
    doneTodo,

    // OTHERS
    authWithSAML,
    authSuccess,
    clearUser,
    refreshToken
   } = appConsts;
  const actions = [ rdRecurringTypeSelectReducer, rdRecurringEndDateTypeSelectReducer, txtRecurringDateSetReducer, weeklyDaysSelectReducer, onCallSaveSuccessReducer,     addTodo, doneTodo,      authWithSAML, authSuccess, clearUser, refreshToken ];

  if (actions.includes(action.type)) {
    console.log("action.type$$: ", action.type);
    console.log('store.getState().task: ', store.getState().task);
    //saveState({ user: store.getState().user });
    let saveIn = '';
    switch (action.type) {
      case rdRecurringTypeSelectReducer:
      case rdRecurringEndDateTypeSelectReducer:
      case txtRecurringDateSetReducer:
      case weeklyDaysSelectReducer:
      case onCallSaveSuccessReducer:
        saveIn = 'call';
        break;
      case addTodo:
      case doneTodo:
          saveIn = 'task';
          break;
      default:
        saveIn = 'call';
    }
    //saveState({ task: store.getState().task });
    saveState({ [saveIn]: store.getState()[saveIn] });
  }

  return returnValue;
};