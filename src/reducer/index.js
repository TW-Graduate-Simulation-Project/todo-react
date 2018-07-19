import Todo from '../model/Todo';
import todosAPI from '../api/TodoResourseAPI';

export default (state = { todos: [], statusOfList: Todo.ALL }, action) => {
  switch (action.type) {
    case 'ADD_TODO': {
      let todo = new Todo(action.content);
      todosAPI.add(todo);
      return {
        ...state,
        todos: [...todosAPI.filerByStatus(state.statusOfList)]
      };
    }
    case 'TOGGLE_TODO_STATUS':
      todosAPI.toggleActive(action.id);
      return {
        ...state,
        todos: [...todosAPI.filerByStatus(state.statusOfList)]
      };
    case 'GET_FILTER_TODOS':
      console.log('cal me ~~~~~~~~~~~~~~~~~~~');
      console.log(action.todos);
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
