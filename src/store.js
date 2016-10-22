import { createStore as createReduxStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';
import ajaxActionsMiddleware from './middleware/ajax-actions';
import analyticsMiddleware from './middleware/analytics';

const defaultState = {
	appName: 'Paquitosoft ReactJS starter kit',
	isLoading: false,
	currentRequest: {},
	currentPageData: {},
	navigationError: undefined
};

let middleware = [ thunkMiddleware, analyticsMiddleware, ajaxActionsMiddleware ];

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
