import Todo from '../model/Todo';

const todosAPI = {
  todos: [],
  add(item) {
    this.todos.push(item);
  },
  filerByStatus(status) {
    if (status === Todo.ALL) {
      return this.deepCopy(this.todos);
    }
    return this.deepCopy(this.todos.filter(item => item.status === status));
  },
  toggleActive(viewId) {
    const todo = this.todos.find(item => item.viewId === viewId);
    if (todo !== undefined) {
      todo.toggleActive();
    }
    return { ...todo };
  },
  updateItemContent(viewId, content) {
    const todo = this.todos.find(item => item.viewId === viewId);
    if (todo !== undefined) {
      todo.content = content;
    }
    return { ...todo };
  },
  deepCopy(array) {
    return JSON.parse(JSON.stringify(array));
  }
};
export default todosAPI;
