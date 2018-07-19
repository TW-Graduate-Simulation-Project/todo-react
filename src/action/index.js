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
