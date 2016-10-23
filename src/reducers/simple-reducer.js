import * as actionTypes from '../actions/types';
import ReducerFactory from './reducer-factory';
import * as constants from '../constants';

const simpleReducerFactory = new ReducerFactory('simple');

simpleReducerFactory.registerActionHandler(actionTypes.AJAX_REQUEST, (action, state) => {
	state.isLoading = true;
	return state;
});

simpleReducerFactory.registerActionHandler(actionTypes.AJAX_ERROR, (action, state) => {
	state.isLoading = false;
	state.appError = action.payload.error;
	return state;
});

// simpleReducerFactory.registerActionHandler(actionTypes.NAVIGATION_REQUEST, (action, state) => {
// 	state.currentRequest = action.payload.request;
// 	state.appError = undefined;
// 	return state;
// });

// simpleReducerFactory.registerActionHandler(actionTypes.NAVIGATION_SUCCESS, (action, state) => {
// 	state.isLoading = false;
// 	state.currentPageData = action.payload.response;
// 	return state;
// });

// simpleReducerFactory.registerActionHandler(actionTypes.NAVIGATION_ERROR, (action, state) => {
// 	state.isLoading = false;
// 	state.appError = action.payload.error;
// 	return state;
// });



// simpleReducerFactory.registerActionHandler(actionTypes.SEARCH_REPOS_SUCCESS, (action, state) => {
// 	state.isLoading = false;
// 	state.currentPageData = action.payload.response;
// 	return state;
// });

// simpleReducerFactory.registerActionHandler(actionTypes.NAVIGATION, (action, state) => {
// 	state.isLoading = action.payload.status === constants.NAVIGATION_START;
// 	return state;
// });

simpleReducerFactory.registerActionHandler('*', (action, state) => {
	if (action.meta && action.meta.ajaxStatus) {
		state.isLoading = action.meta.ajaxStatus === constants.AJAX_STATUS_REQUEST;
	}

	return state;
});

simpleReducerFactory.registerActionHandler(actionTypes.SEARCH_REPOS, (action, state) => {
	// state.isLoading = action.meta.status === constants.ACTION_STATUS_REQUEST;

	// switch(action.meta.status) {
	// 	case constants.ACTION_STATUS_SUCCESS:
	// 		state.repos = action.payload.repos;
	// 		break;
	// 	case constants.ACTION_STATUS_ERROR:
	// 		state.appError = action.payload.error;
	// 		break;
	// }

	state.repos = action.payload.repos;
	return state;
});


simpleReducerFactory.registerActionHandler(actionTypes.REPO_DETAILS, (action, state) => {
	// state.isLoading = action.meta.status === constants.ACTION_STATUS_REQUEST;

	// switch(action.meta.status) {
	// 	case constants.ACTION_STATUS_SUCCESS:
	// 		state.repoDetails = action.payload.repoDetails;
	// 		break;
	// 	case constants.ACTION_STATUS_ERROR:
	// 		state.appError = action.payload.error;
	// 		break;
	// }
	
	state.repoDetails = action.payload.repoDetails;
	return state;
});

export default simpleReducerFactory.createReducer();