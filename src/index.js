import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TodoApp from './container/TodoApp';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducer';
import thunk from 'redux-thunk';

const store = (initialState =>
  createStore(rootReducer, initialState, applyMiddleware(thunk)))();

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
