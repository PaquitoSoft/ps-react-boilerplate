import ReducerFactory from './reducer-factory';
import * as actionTypes from '../actions/types';

const simpleReducerFactory = new ReducerFactory('simple');

// simpleReducerFactory.handleAction(actionTypes.TOP_RATED_MOVIES, (action, state) => {
// 	state.moviesList = action.payload.movies;
// 	return state;
// });

simpleReducerFactory.handleNavigationAction(actionTypes.LOAD_MOVIES_LIST, (action, state) => {
	state.moviesList = action.payload.movies;
  state.moviesFilter = action.payload.filter;
	return state;
});


// simpleReducerFactory.handleAction(actionTypes.MOVIE_DETAILS, (action, state) => {
// 	state.movieDetails = action.payload.details;
// 	return state;
// });

simpleReducerFactory.handleNavigationAction(actionTypes.MOVIE_DETAILS, (action, state) => {
	state.movieDetails = action.payload.details;
	return state;
});


export default simpleReducerFactory.toStandardReducer();
