import Todo from '../model/Todo';
import axios from 'axios';

const todosAPI = {
  todos: [],
  add(item) {
    this.todos.push(item);
  },
  filerByStatus(status, successCallBack) {
    let filterStatus = status;
    if (status === Todo.ALL) {
      filterStatus = '';
    }
    axios
      .get('http://5b4dcb2aec112500143a2311.mockapi.io/api/todos', {
        params: {
          search: filterStatus
        }
      })
      .then(function(response) {
        // handle success
        console.log(response.data);
        successCallBack(
          response.data.map(
            todo => new Todo(todo.id, todo.content, todo.status)
          )
        );
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });
    // return this.deepCopy(this.todos.filter(item => item.status === status));
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
