import todosAPI from '../api/TodoResourseAPI';
import Todo from '../model/Todo';

export const addTodo = content => ({
  type: 'ADD_TODO',
  content
});

export const getFilterTodos = (statusOfList, todos) => ({
  type: 'GET_FILTER_TODOS',
  todos,
  statusOfList
});

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO_STATUS',
  id
});

export const updateTodo = (id, content) => ({
  type: 'UPDATE_TODO',
  id,
  content
});

export const addTodoAPI = content => (dispatch, getState) => {
  let todo = new Todo(content);
  todosAPI.add(todo);
  dispatch(getFilterTodosAPI(getState().statusOfList));
};

export const updateTodoAPI = (id, content) => {
  return (dispatch, getState) => {
    todosAPI.updateItemContent(id, content);
    dispatch(getFilterTodosAPI(getState().statusOfList));
  };
};

export const toggleTodoAPI = id => {
  return (dispatch, getState) => {
    todosAPI.toggleActive(id);
    dispatch(getFilterTodosAPI(getState().statusOfList));
  };
};

export const getFilterTodosAPI = statusOfList => {
  return (dispatch, getState) => {
    const todos = todosAPI.filerByStatus(statusOfList);
    dispatch(getFilterTodos(statusOfList, todos));
  };
};
