import Todo from '../model/Todo';

export default (state = { todos: [], statusOfList: Todo.ALL }, action) => {
  const statusFilter =
    state.statusOfList === Todo.ALL
      ? () => true
      : todo => {
          return todo.status === state.statusOfList;
        };

  switch (action.type) {
    case 'ADD_TODO': {
      return {
        ...state,
        todos: [...state.todos, action.todo].filter(statusFilter)
      };
    }
    case 'TOGGLE_TODO_STATUS': {
      console.log(action.todo);
      return {
        ...state,
        todos: state.todos
          .map(
            todo =>
              todo.viewId === action.todo.viewId
                ? { ...todo, status: action.todo.status }
                : todo
          )
          .filter(statusFilter)
      };
    }
    case 'GET_FILTER_TODOS':
      return {
        todos: [...action.todos],
        statusOfList: action.statusOfList
      };
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map(
          todo =>
            todo.viewId === action.todo.viewId
              ? { ...todo, content: action.todo.content }
              : todo
        )
      };
    default:
      return state;
  }
};
