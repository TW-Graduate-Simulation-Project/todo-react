import Todo from '../model/Todo';
import axios from 'axios';

const todosAPI = {
  todos: [],
  apiUrl: 'http://5b4dcb2aec112500143a2311.mockapi.io/api',
  add(todo, successCallBack) {
    // this.todos.push(todo, successCallBack);
    axios
      .post(`${this.apiUrl}/todos`, {
        id: todo.viewId,
        content: todo.content,
        status: todo.status
      })
      .then(function(response) {
        console.log(response.data);
        successCallBack(
          new Todo(
            response.data.id,
            response.data.content,
            response.data.status
          )
        );
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  filerByStatus(status, successCallBack) {
    let filterStatus = status;
    if (status === Todo.ALL) {
      filterStatus = '';
    }
    axios
      .get(`${this.apiUrl}/todos`, {
        params: {
          search: filterStatus
        }
      })
      .then(function(response) {
        // handle success
        successCallBack(
          response.data.map(
            todo => new Todo(todo.id, todo.content, todo.status)
          )
        );
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  },
  toggleActive(todo, successCallBack) {
    axios
      .put(`${this.apiUrl}/todos/${todo.viewId}`, {
        status: Todo.getToggleStatus(todo.status)
      })
      .then(function(response) {
        console.log(response.data);
        successCallBack(
          new Todo(
            response.data.id,
            response.data.content,
            response.data.status
          )
        );
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  updateItemContent(viewId, content, successCallBack) {
    axios
      .put(`${this.apiUrl}/todos/${viewId}`, {
        content: content
      })
      .then(function(response) {
        console.log(response.data);
        successCallBack(
          new Todo(
            response.data.id,
            response.data.content,
            response.data.status
          )
        );
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  deepCopy(array) {
    return JSON.parse(JSON.stringify(array));
  }
};
export default todosAPI;
