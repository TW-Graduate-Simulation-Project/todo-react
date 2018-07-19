import Todo from '../model/Todo';

export default (state = { todos: [], statusOfList: Todo.ALL }, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      console.log(action);
      return {
        ...state,
        todos: [...state.todos, new Todo(action.content)]
      };
    case 'TOGGLE_TODO_STATUS':
      return {
        ...state,
        todos: state.todos.map(
          todo =>
            todo.viewId === action.id
              ? { ...todo, status: Todo.getToggleStatus(todo.status) }
              : todo
        )
      };
    case 'GET_FILTER_TODOS':
      if (action.statusOfList === Todo.ALL) {
        return { ...state, todo: [...state.todos] };
      }
      return {
        todos: state.todos.filter(item => item.status === action.statusOfList),
        statusOfList: action.statusOfList
      };
    default:
      return state;
  }
};
