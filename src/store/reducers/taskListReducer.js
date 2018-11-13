import { appConsts } from '../../constants';

const {
  addTodo,
  doneTodo
} = appConsts;

const defaultTodos = [
  {
    task: 'Initial todo in store',
    state: 'PENDING',
  }
];

const defaultStateModel = {
  checkedRoot: true,
  isTnCAccepted: true,
  todos: defaultTodos,
  allTodos: defaultTodos,
  filter: 'PENDING',
  extraData_todos: false,

  // user: false,
  // requesting: false,
  // authError: '',
  // forgotPasswordError: '',
  // forgotPasswordSuccess: false,
  // name: '',
  // password: '',
  // token: '',
  // forgotPassMessage: '',
  // email: '',
  // lastSignIn: '',
  // rememberMe: false,
};

export const taskListReducer = (state = defaultStateModel, action) => {
  switch(action.type) {

    case addTodo:
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
    console.log('TOGGLE_STATE');
      const filter = state.filter === 'PENDING' ? 'DONE' : 'PENDING';
      return Object.assign({}, state, {
        filter,
        todos: state.allTodos.filter((fTodo) => fTodo.state === filter),
      });

    default:
      return state;
  }
};