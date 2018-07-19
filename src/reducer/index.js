import Todo from '../model/Todo';

export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      console.log(action);
      return [...state, new Todo(action.content)];
    case 'TOGGLE_TODO_STATUS':
      return state.map(
        todo =>
          todo.viewId === action.id
            ? { ...todo, status: Todo.getToggleStatus(todo.status) }
            : todo
      );
    default:
      return state;
  }
};
