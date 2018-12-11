import { appConsts } from '../../constants';
import moment from 'moment';

const {
  // Add Call -> Select Rcurring Type Screen
  rdRecurringTypeSelectReducer,
  rdRecurringEndDateTypeSelectReducer,
  txtRecurringDateSetReducer,
  weeklyDaysSelectReducer,

  // On Call Save
  onCallSaveSuccessReducer,


  rdOptionRecurring,
  rdOptionRecurringEndDate
} = appConsts;

let todaysDate = new Date();

const defaultStateModel = {
  addCall: {
    recurring: {
      on: rdOptionRecurring.doNotRepeat,
      endDateType: rdOptionRecurringEndDate.forever,
      endDate: moment(todaysDate).add(1, 'days').format("YYYY-MM-DD"),
      weeklyDays: [todaysDate.getDay()],
      extraData_weeklyDays: false
    }
  }
};

export const callReducer = (state = defaultStateModel, action) => {
  console.log('state: ', state);

  switch(action.type) {

    case rdRecurringTypeSelectReducer:
      const recurringObj = Object.assign({}, state.addCall.recurring, {
        on: action.recurringType
      });
      //console.log('recurringObj: ', recurringObj);
      const addCallObj = Object.assign({}, state.addCall, {
        recurring: recurringObj
      });
      console.log('addCallObj: ', addCallObj);
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
      console.log('addCallObj2: ', addCallObj2);
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
        console.log('addCallObj3: ', addCallObj3);
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
        console.log('addCallObj4: ', addCallObj4);
        return Object.assign({}, state, {
          addCall: addCallObj4
        });
        break;

      case onCallSaveSuccessReducer:
        const addCallObj5 = Object.assign({}, state.addCall, {
          recurring: defaultStateModel.addCall.recurring
        });
        console.log('addCallObj5: ', addCallObj5);
        return Object.assign({}, state, {
          addCall: addCallObj5
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