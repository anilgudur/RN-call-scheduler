import { saveState } from '../utils/asyncStorageUtils';
import { appConsts } from '../constants';

export const asyncStorageMiddleware = store => next => action => {
  const returnValue = next(action);

  const {
    // CALL
    listColorSelectReducer,
    rdRecurringTypeSelectReducer,
    rdRecurringEndDateTypeSelectReducer,
    txtRecurringDateSetReducer,

    // TODO
    addTodo,
    doneTodo,

    // OTHERS
    authWithSAML,
    authSuccess,
    clearUser,
    refreshToken
   } = appConsts;
  const actions = [ listColorSelectReducer, rdRecurringTypeSelectReducer, rdRecurringEndDateTypeSelectReducer, txtRecurringDateSetReducer,     addTodo, doneTodo,      authWithSAML, authSuccess, clearUser, refreshToken ];

  if (actions.includes(action.type)) {
    console.log("action.type$$: ", action.type);
    console.log('store.getState().task: ', store.getState().task);
    //saveState({ user: store.getState().user });
    let saveIn = '';
    switch (action.type) {
      case listColorSelectReducer:
      case rdRecurringTypeSelectReducer:
      case rdRecurringEndDateTypeSelectReducer:
      case txtRecurringDateSetReducer:
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