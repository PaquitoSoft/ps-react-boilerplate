import * as actionTypes from '../actions/types';
import ReducerFactory from './reducer-factory';

const simpleReducerFactory = new ReducerFactory('simple');

simpleReducerFactory.registerActionHandler(actionTypes.NAVIGATION_REQUEST, (action, state) => {
	state.isLoading = true;
	state.currentRequest = action.payload.request;
	state.navigationError = undefined;
	return state;
});

simpleReducerFactory.registerActionHandler(actionTypes.NAVIGATION_SUCCESS, (action, state) => {
	state.isLoading = false;
	state.currentPageData = action.payload.response;
	return state;
});

simpleReducerFactory.registerActionHandler(actionTypes.NAVIGATION_ERROR, (action, state) => {
	state.isLoading = false;
	state.navigationError = action.payload.error;
	return state;
});

export default simpleReducerFactory.createReducer();