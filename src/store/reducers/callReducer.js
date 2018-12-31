import { appConsts } from "../../constants";
import moment from "moment";

const {
  // Add Call -> Select Rcurring Type Screen
  rdRecurringTypeSelectReducer,
  rdRecurringEndDateTypeSelectReducer,
  txtRecurringDateSetReducer,
  weeklyDaysSelectReducer,

  // On Call Save
  onCallSaveSuccessReducer,
  editCallReducer,
  callListRefreshReducer,
  callListRefreshFalseReducer,

  rdOptionRecurring,
  rdOptionRecurringEndDate
} = appConsts;

let todaysDate = new Date();

const defaultStateModel = {
  addCall: {
    recurring: {
      on: rdOptionRecurring.doNotRepeat,
      endDateType: rdOptionRecurringEndDate.forever,
      endDate: moment(todaysDate).add(1, "days"),
      weeklyDays: [todaysDate.getDay()],
      extraData_weeklyDays: false
    }
  },
  callListRefresh: false
};

export const callReducer = (state = defaultStateModel, action) => {
  //console.log("callReducer state: ", state);

  switch (action.type) {
    case rdRecurringTypeSelectReducer:
      const recurringObj = Object.assign({}, state.addCall.recurring, {
        on: action.recurringType
      });
      //console.log('recurringObj: ', recurringObj);
      const addCallObj = Object.assign({}, state.addCall, {
        recurring: recurringObj
      });
      //console.log("addCallObj: ", addCallObj);
      return Object.assign({}, state, {
        addCall: addCallObj
      });
      break;

    case rdRecurringEndDateTypeSelectReducer:
      const recurringDateObj = Object.assign({}, state.addCall.recurring, {
        endDateType: action.rdEndDate
      });
      //console.log('recurringDateObj: ', recurringDateObj);
      const addCallObj2 = Object.assign({}, state.addCall, {
        recurring: recurringDateObj
      });
      //console.log("addCallObj2: ", addCallObj2);
      return Object.assign({}, state, {
        addCall: addCallObj2
      });
      break;

    case txtRecurringDateSetReducer:
      const recurringObj3 = Object.assign({}, state.addCall.recurring, {
        endDate: action.recurringDate
      });
      //console.log('recurringObj3: ', recurringObj3);
      const addCallObj3 = Object.assign({}, state.addCall, {
        recurring: recurringObj3
      });
      //console.log("addCallObj3: ", addCallObj3);
      return Object.assign({}, state, {
        addCall: addCallObj3
      });
      break;

    case weeklyDaysSelectReducer:
      const recurringObj4 = Object.assign({}, state.addCall.recurring, {
        weeklyDays: action.weeklyDays,
        extraData_weeklyDays: !state.addCall.recurring.extraData_weeklyDays
      });
      //console.log('recurringObj4: ', recurringObj4);
      const addCallObj4 = Object.assign({}, state.addCall, {
        recurring: recurringObj4
      });
      //console.log("addCallObj4: ", addCallObj4);
      return Object.assign({}, state, {
        addCall: addCallObj4
      });
      break;

    case onCallSaveSuccessReducer:
      const addCallObj5 = Object.assign({}, state.addCall, {
        recurring: defaultStateModel.addCall.recurring
      });
      //console.log("addCallObj5: ", addCallObj5);
      // console.log(
      //   "defaultStateModel.addCall.recurring:: ",
      //   defaultStateModel.addCall.recurring
      // );
      return Object.assign({}, state, {
        addCall: addCallObj5
      });
      break;

    case editCallReducer:
      const item = action.item;
      let weeklyDaysSplit =
        item.weekly.trim().length > 0
          ? item.weekly.trim().split(",")
          : defaultStateModel.addCall.recurring.weeklyDays;
      weeklyDaysSplit = weeklyDaysSplit.map(value => parseInt(value));

      const recurringObj6 = Object.assign({}, state.addCall.recurring, {
        on: item.recurring_type_id,
        endDateType:
          item.recurring_end_date_type_id != ""
            ? item.recurring_end_date_type_id
            : defaultStateModel.addCall.recurring.endDateType,
        endDate:
          item.recurring_end_date == ""
            ? defaultStateModel.addCall.recurring.endDate
            : moment(item.recurring_end_date),
        weeklyDays: weeklyDaysSplit,
        extraData_weeklyDays: !state.addCall.recurring.extraData_weeklyDays
      });
      //console.log("recurringObj6: ", recurringObj6);
      const addCallObj6 = Object.assign({}, state.addCall, {
        recurring: recurringObj6
      });
      return Object.assign({}, state, {
        addCall: addCallObj6
      });
      break;

    case callListRefreshReducer:
      return Object.assign({}, state, {
        callListRefresh: true
      });
      break;

    case callListRefreshFalseReducer:
      return Object.assign({}, state, {
        callListRefresh: false
      });
      break;

    /*case addTodo:
      const allTodos = state.allTodos.concat([{
        task: action.task,
        state: 'PENDING',
      }]);
      return Object.assign({}, state, {
        allTodos: allTodos,
        todos: allTodos.filter((fTodo) => fTodo.state === state.filter),
      });

    case doneTodo:
      console.log('In DONE_TODO state');
      const doneTodoObj = Object.assign({}, action.todo, {
        state: 'DONE',
      });
      console.log('action.todo: ', action.todo);
      console.log('doneTodoObj: ', doneTodoObj);

      const updatedAllTodos = state.allTodos.map((todo) => {
        if (todo.task === action.todo.task && todo.state === action.todo.state) {
          console.log('>>>>>>>>>>>>>>>>matched: ', todo);
        } else {
          console.log('-----not matched: ', todo);
        }
        return todo.task === action.todo.task && todo.state === action.todo.state ? doneTodoObj : todo;
      });
      console.log('updatedAllTodos: ', updatedAllTodos);
      console.log('In DONE_TODO state 2');
      return Object.assign({}, state, {
        allTodos: updatedAllTodos,
        // todos: state.todos.filter((fTodo) => {
        //   return fTodo !== action.todo;
        // }),
        todos: updatedAllTodos.filter((fTodo) => fTodo.state === state.filter),
      });

    case 'TOGGLE_STATE':
      const filter = state.filter === 'PENDING' ? 'DONE' : 'PENDING';
      return Object.assign({}, state, {
        filter,
        todos: state.allTodos.filter((fTodo) => fTodo.state === filter),
      });*/

    default:
      return state;
  }
};
