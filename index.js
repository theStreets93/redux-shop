import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './App.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';

import Routing from './modules/Routing';

import { createStore } from './store';

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <Routing />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
