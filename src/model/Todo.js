export default class Todo {
  // constructor(content) {
  //   this.content = content;
  //   this.status = Todo.ACTIVE;
  //   this.viewId = new Date().getTime();
  // }

  constructor(id, content, status) {
    this.content = content;
    this.status = status;
    this.viewId = id;
  }

  static get ACTIVE() {
    return 'active';
  }

  static get COMPLETED() {
    return 'completed';
  }

  static get ALL() {
    return 'all';
  }

  complete() {
    this.status = Todo.COMPLETED;
  }

  reactive() {
    this.status = Todo.ACTIVE;
  }

  toggleActive() {
    this.status = this.status === Todo.ACTIVE ? Todo.COMPLETED : Todo.ACTIVE;
  }

  static getToggleStatus(status) {
    return status === Todo.ACTIVE ? Todo.COMPLETED : Todo.ACTIVE;
  }
}
