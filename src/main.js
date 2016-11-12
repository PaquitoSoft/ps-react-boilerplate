import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
// import { LOCATION_CHANGE, syncHistoryWithStore } from 'react-router-redux';
import { createStore } from './store';
import { getRoutes } from './config/routes-config';

const store = createStore();

// const history = syncHistoryWithStore(browserHistory, store, {
//   selectLocationState: state => state.routing
// });

const routes = getRoutes(store);

const app = (
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
