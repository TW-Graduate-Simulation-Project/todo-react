import React, { Component } from 'react';
import Todo from '../model/Todo';
import '../App.css';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'read'
    };
  }

  changeToEditable() {
    this.setState({ status: 'write' });
  }

  updateItem(e, viewId, content) {
    if (e.keyCode === 27) {
      this.setState({ status: 'read' });
    }

    if (e.keyCode === 13) {
      if (this.props.item.content !== content) {
        this.props.updateItemContent(viewId, content);
      }
      // console.log(this.props.item);
      this.setState({ status: 'read' });
    }
  }

  toggleActive(item) {
    this.setState({ status: 'read' });
    this.props.toggleActiveHandler(item);
  }

  render() {
    const item = this.props.item;
    return (
      <li className={item.status}>
        {
          <input
            type="checkbox"
            className="done-todo"
            defaultChecked={item.status === Todo.COMPLETED}
            onClick={e => this.toggleActive(item)}
          />
        }
        <span
          className="text-wrapper"
          onDoubleClick={e => this.changeToEditable(e)}
        >
          {this.state.status === 'read' ? (
            item.content
          ) : (
            <input
              autoFocus
              className="edit-input"
              defaultValue={item.content}
              onKeyUp={e =>
                this.updateItem(e, item.viewId, e.currentTarget.value)
              }
            />
          )}
        </span>
      </li>
    );
  }
}

export default TodoItem;
