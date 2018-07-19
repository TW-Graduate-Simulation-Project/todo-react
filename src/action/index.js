import todosAPI from '../api/TodoResourseAPI';
import Todo from '../model/Todo';

export const addTodo = todo => ({
  type: 'ADD_TODO',
  todo
});

export const getFilterTodos = (statusOfList, todos) => ({
  type: 'GET_FILTER_TODOS',
  todos,
  statusOfList
});

export const toggleTodo = todo => ({
  type: 'TOGGLE_TODO_STATUS',
  todo
});

export const updateTodo = (id, content) => ({
  type: 'UPDATE_TODO',
  id,
  content
});

export const addTodoAPI = content => (dispatch, getState) => {
  const todo = new Todo(content);
  todosAPI.add(todo);
  dispatch(addTodo({ ...todo }));
};

export const updateTodoAPI = (id, content) => {
  return (dispatch, getState) => {
    todosAPI.updateItemContent(id, content);
    dispatch(getFilterTodosAPI(getState().statusOfList));
  };
};

export const toggleTodoAPI = id => {
  return (dispatch, getState) => {
    const todo = todosAPI.toggleActive(id);
    dispatch(toggleTodo(todo));
  };
};

export const getFilterTodosAPI = statusOfList => {
  return (dispatch, getState) => {
    const todos = todosAPI.filerByStatus(statusOfList);
    dispatch(getFilterTodos(statusOfList, todos));
  };
};
