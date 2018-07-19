import Todo from '../model/Todo';
import todosAPI from '../api/TodoResourseAPI';

export default (state = { todos: [], statusOfList: Todo.ALL }, action) => {
  switch (action.type) {
    case 'ADD_TODO': {
      return {
        ...state,
        todos: [...state.todos, action.todo]
      };
    }
    case 'TOGGLE_TODO_STATUS':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.todo.id) {
            console.log(todo === action.todo);
            console.log(todo);
            console.log(action.todo);
          }
          return todo.id === action.todo.id
            ? { ...todo, status: action.todo.status } //if return action.todo direactly ,it will throw err
            : todo;
        })
      };
    case 'GET_FILTER_TODOS':
      return {
        todos: [...action.todos],
        statusOfList: action.statusOfList
      };
    case 'UPDATE_TODO':
      todosAPI.updateItemContent(action.id, action.content);
      return {
        ...state,
        todos: [...todosAPI.filerByStatus(state.statusOfList)]
      };
    default:
      return state;
  }
};
