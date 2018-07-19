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

export const updateTodo = todo => ({
  type: 'UPDATE_TODO',
  todo
});

export const addTodoAPI = content => dispatch => {
  const todo = new Todo(content);
  todosAPI.add(todo);
  dispatch(addTodo(todo));
};

export const updateTodoAPI = (id, content) => {
  return dispatch => {
    const todo = todosAPI.updateItemContent(id, content);
    dispatch(updateTodo(todo));
  };
};

export const toggleTodoAPI = id => {
  return dispatch => {
    const todo = todosAPI.toggleActive(id);
    dispatch(toggleTodo(todo));
  };
};

export const getFilterTodosAPI = statusOfList => {
  return dispatch => {
    const todos = todosAPI.filerByStatus(statusOfList);
    dispatch(getFilterTodos(statusOfList, todos));
  };
};
