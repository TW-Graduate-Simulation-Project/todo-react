import Todo from '../model/Todo';

export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      console.log(action);
      return [...state, new Todo(action.content)];
    case 'TOGGLE_TODO_STATUS':
      return state.map(
        todo =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
};
