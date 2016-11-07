import { createStore as createReduxStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';
import analyticsMiddleware from './middleware/analytics';

const defaultState = {
  routing: {},
  appTitle: 'Paquitosoft ReactJS starter kit',
	isLoading: false,
  moviesList: [],
  movieDetails: {},
	repos: [],
	repoDetails: {},
	appError: undefined
};

let middleware = [ thunkMiddleware, analyticsMiddleware ];

if (process.env.NODE_ENV !== 'production') {
	middleware.push(createLogger());
}

export function createStore() {
	return createReduxStore(
		rootReducer,
		Object.assign({}, defaultState),
		applyMiddleware(...middleware)
	);
}
