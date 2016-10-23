import ReducerFactory from './reducer-factory';
import * as actionTypes from '../actions/types';
import * as constants from '../constants';

const simpleReducerFactory = new ReducerFactory('simple');

simpleReducerFactory.registerActionHandler('*', (action, state) => {
	if (action.meta && action.meta.ajaxStatus) {
		state.isLoading = action.meta.ajaxStatus === constants.AJAX_STATUS_REQUEST;
	}

	return state;
});


simpleReducerFactory.registerActionHandler(actionTypes.AJAX_REQUEST, (action, state) => {
	state.isLoading = true;
	return state;
});

simpleReducerFactory.registerActionHandler(actionTypes.AJAX_ERROR, (action, state) => {
	state.isLoading = false;
	state.appError = action.payload.error;
	return state;
});


simpleReducerFactory.registerActionHandler(actionTypes.SEARCH_REPOS, (action, state) => {
	state.repos = action.payload.repos;
	return state;
});


simpleReducerFactory.registerActionHandler(actionTypes.REPO_DETAILS, (action, state) => {
	state.repoDetails = action.payload.repoDetails;
	return state;
});

export default simpleReducerFactory.createReducer();
