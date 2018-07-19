import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import Todo from '../model/Todo';
import TodoItem from '../component/TodoItem';
import classNames from 'classnames';
import todosAPI from '../api/TodoResourseAPI';
import { addTodo, updateTodo, toggleTodo, getFilterTodos } from '../action';

class TodoApp extends Component {
  componentDidMount() {
    this.setState({
      todos: this.props.onFilerTodos(Todo.ALL)
    });
  }

  add = event => {
    if (event.keyCode === 13) {
      this.props.onAddTodo(this.refs.newItem.value);
      this.refs.newItem.value = '';
    }
  };

  showFilterList = event => {
    const statusOfList = event.target.attributes.getNamedItem('data-filter')
      .value;
    this.props.onFilerTodos(statusOfList);
  };

  render() {
    return (
      <div className="container">
        <div>
          <h2>Jquery To Do List</h2>
          <p>
            <em>Simple Todo List with adding and filter by diff status.</em>
          </p>
        </div>
        <div>
          <input
            className="input-text"
            onKeyUp={this.add}
            id="todo-creator"
            ref="newItem"
          />
          <div className="button" onClick={this.add}>
            Add
          </div>
        </div>
        <div>
          <ol>
            {this.props.todos.map(item => (
              <TodoItem
                item={item}
                key={item.viewId}
                toggleActiveHandler={viewId => this.props.onToggleTodo(viewId)}
                updateItemContent={(viewId, content) =>
                  this.props.onUpdateTodo(viewId, content)
                }
              />
            ))}
          </ol>
        </div>
        <div>
          <ul className="filters">
            <li>
              <a
                href="#all"
                onClick={this.showFilterList}
                data-filter="all"
                className={classNames({
                  selected: this.props.statusOfList === Todo.ALL
                })}
              >
                ALL
              </a>
            </li>
            <li>
              <a
                href="#active"
                onClick={this.showFilterList}
                data-filter="active"
                className={classNames({
                  selected: this.props.statusOfList === Todo.ACTIVE
                })}
              >
                Active
              </a>
            </li>
            <li>
              <a
                href="#completed"
                onClick={this.showFilterList}
                data-filter="completed"
                className={classNames({
                  selected: this.props.statusOfList === Todo.COMPLETED
                })}
              >
                Complete
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos,
  statusOfList: state.statusOfList
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onToggleTodo: id => {
    const todo = todosAPI.toggleActive(id);
    return dispatch(toggleTodo(todo));
  },
  onAddTodo: content => {
    const todo = new Todo(new Date().getTime(), content, Todo.ACTIVE);
    todosAPI.add(todo);
    return dispatch(addTodo(todo));
  },
  onFilerTodos: statusOfList => {
    todosAPI.filerByStatus(statusOfList, todos => {
      dispatch(getFilterTodos(statusOfList, todos));
    });
  },
  onUpdateTodo: (id, content) => {
    const todo = todosAPI.updateItemContent(id, content);
    return dispatch(updateTodo(todo));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoApp);
