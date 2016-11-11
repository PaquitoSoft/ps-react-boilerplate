import ReducerFactory from './reducer-factory';
import * as actionTypes from '../actions/types';
import * as constants from '../constants';

const simpleReducerFactory = new ReducerFactory('simple');

simpleReducerFactory.handleAction('*', (action, state) => {
	debugger;
	if (action.meta && action.meta.ajaxStatus) {
		state.isLoading = action.meta.ajaxStatus === constants.AJAX_STATUS_REQUEST;
	}

	return state;
});


simpleReducerFactory.handleAction(actionTypes.AJAX_REQUEST, (action, state) => {
	state.isLoading = true;
	return state;
});

simpleReducerFactory.handleAction(actionTypes.AJAX_ERROR, (action, state) => {
	state.isLoading = false;
	state.appError = action.payload.error;
	return state;
});


simpleReducerFactory.handleAction(actionTypes.SEARCH_REPOS, (action, state) => {
	state.repos = action.payload.repos;
	return state;
});


simpleReducerFactory.handleAction(actionTypes.REPO_DETAILS, (action, state) => {
	state.repoDetails = action.payload.repoDetails;
	return state;
});


// simpleReducerFactory.handleAction(actionTypes.TOP_RATED_MOVIES, (action, state) => {
// 	state.moviesList = action.payload.movies;
// 	return state;
// });

simpleReducerFactory.handleNavigationAction(actionTypes.TOP_RATED_MOVIES, (action, state) => {
	state.moviesList = action.payload.movies;
	return state;
});


simpleReducerFactory.handleAction(actionTypes.MOVIE_DETAILS, (action, state) => {
	state.movieDetails = action.payload.details;
	return state;
});


export default simpleReducerFactory.toStandardReducer();
