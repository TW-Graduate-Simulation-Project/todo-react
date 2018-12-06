import Todo from '../model/Todo';
import axios from 'axios';

const todosAPI = {
  todos: [],
  apiUrl: 'https://tw-simulation-todo-api.herokuapp.com/api',
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
      filterStatus = `${Todo.ACTIVE}, ${Todo.COMPLETED}`;
    }
    axios
      .get(`${this.apiUrl}/todos/search/statusOfTodos`, {
        params: {
          status: filterStatus
        }
      })
      .then(function(response) {
        // handle success
        successCallBack(
          response.data._embedded.todos.map(
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
        status: Todo.getToggleStatus(todo.status),
        content: todo.content
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
  updateItemContent(todo, successCallBack) {
    axios
      .put(`${this.apiUrl}/todos/${todo.viewId}`, {
        content: todo.content,
        status: todo.status
      })
      .then(function(response) {
        console.log(response.data);
        successCallBack(
          new Todo(response.data.id, response.data.content, todo.status)
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
