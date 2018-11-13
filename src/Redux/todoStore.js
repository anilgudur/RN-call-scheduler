import { createStore } from 'redux';

const defaultTodos = [
  {
    task: 'Initial todo in store',
    state: 'PENDING',
  }
];

const defaultState = {
  todos: defaultTodos,
  allTodos: defaultTodos,
  filter: 'PENDING',

  checkedRoot: true,
  isTnCAccepted: true,
  extraData_todos: false,
}

function todoStore(state = defaultState, action) {
  switch(action.type) {

    case 'ADD_TODO':
      const allTodos = state.allTodos.concat([{
        task: action.task,
        state: 'PENDING',
      }]);
      return Object.assign({}, state, {
        allTodos: allTodos,
        todos: allTodos.filter((fTodo) => fTodo.state === state.filter),
      });

    case 'DONE_TODO':
      const doneTodo = Object.assign({}, action.todo, {
        state: 'DONE',
      });

      const updatedAllTodos = state.allTodos.map((todo) => {
        return todo === action.todo ? doneTodo : todo;
      });

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
      });

    default:
      return state;
  }
}

export default createStore(todoStore);