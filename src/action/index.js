export const addTodo = content => ({
  type: 'ADD_TODO',
  content
});

export const getFilterTodos = statusOfList => ({
  type: 'GET_FILTER_TODOS',
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
