import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { LOCATION_CHANGE, syncHistoryWithStore } from 'react-router-redux';
import { createStore } from './store';
import { getRoutes } from './config/routes-config';
import App from './containers/app';
import HomePage from './containers/home-page/home-page';
import DetailPage from './containers/detail-page/detail-page';

// const app = (
// 	<Provider store={createStore()}>
// 		<App />
// 	</Provider>
// );

const store = createStore();

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: state => state.routing
});

function onEnter(nextState, replace, callback) {
  console.info('onEnter:', nextState);
  callback();
}

function onChange(prevState, nextState, replace, callback) {
  console.info('onChange:', prevState, nextState);
  callback();
}

function onLeave(prevState) {
  console.info('onLeave:', prevState);
}


// routes={getRoutes(store)}
// <Route path="/" component={App}>
//     <IndexRoute component={HomePage} />
//     <Route path="repo/:repoName" component={DetailPage} />
// </Route>

// <Router history={browserHistory}>
//   <Route path="/" component={App}>
//       <IndexRoute component={HomePage} onEnter={onEnter} onChange={onChange} onLeave={onLeave} />
//       <Route path="repo/:repoName" component={DetailPage} onEnter={onEnter} onChange={onChange} onLeave={onLeave} />
//   </Route>
// </Router>

const routes = getRoutes(store);

const app = (
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
