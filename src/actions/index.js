import * as actionTypes from './types';
import * as constants from '../constants';
// import { getTrendingRepos, getRepoDetails } from '../api/github';
import * as tmdb from '../api/tmdb';

export const MOVIES_FILTER_TOP_RATED = 'MOVIES_FILTER_TOP_RATED';
export const MOVIES_FILTER_POPULAR = 'MOVIES_FILTER_POPULAR';
export const MOVIES_FILTER_PREMIER = 'MOVIES_FILTER_PREMIER';
export const MOVIES_FILTER_UPCOMING = 'MOVIES_FILTER_UPCOMING';

const moviesLoaderMap = {
  [constants.MOVIES_FILTER_TOP_RATED]: tmdb.getTopRated,
  [constants.MOVIES_FILTER_POPULAR]: tmdb.getPopular,
  [constants.MOVIES_FILTER_PREMIER]: tmdb.getPremiers,
  [constants.MOVIES_FILTER_UPCOMING]: tmdb.getUpcoming,
};

/*
	@param config 
		{
			type,
			fetchOperation,
			successPayload
		}
*/
function ajaxAction(config) {
	return dispatch => {
		dispatch({
			type: actionTypes.AJAX_REQUEST,
			meta: Object.assign({
				action: config.type,
				ajaxStatus: constants.AJAX_STATUS_REQUEST
			}, config.meta)
		});

		return new Promise((resolve, reject) => {		
			config.fetchOperation()
				.then(data => {
					dispatch({
						type: config.type,
						meta: {
							ajaxStatus: constants.AJAX_STATUS_SUCCESS
						},
						payload: config.successPayload(data)
					});
					resolve();
				})
				.catch(error => {
					dispatch({
						type: actionTypes.AJAX_ERROR,
						meta: {
							ajaxStatus: constants.AJAX_STATUS_ERROR
						},
						payload: {
							error
						}
					});
					reject(error);
				});
		});
	};
}

export function navigationStart() {
	return {
		type: actionTypes.AJAX_REQUEST
	};
}

export function navigationSuccess() {
	return {
		type: actionTypes.AJAX_SUCCESS
	};
}

export function navigationError(error) {
	return {
		type: actionTypes.AJAX_ERROR,
		payload: { error }
	};
}

export function loadMoviesList() {
  return (dispatch, getState) => {
    return ajaxAction({
      type: actionTypes.LOAD_MOVIES_LIST,
      fetchOperation: () => moviesLoaderMap(getState().moviesFilter()),
      successPayload: data => ({ movies: data.results })
    });
  };
}

export function loadTopRated() {
  return ajaxAction({
    type: actionTypes.TOP_RATED_MOVIES,
    fetchOperation: () => tmdb.getTopRated(),
    successPayload: data => ({ movies: data.results })
  });
}

export function loadMovieDetails(movieId) {
  return ajaxAction({
    type: actionTypes.MOVIE_DETAILS,
    fetchOperation: () => tmdb.getMovieDetails(movieId),
    successPayload: data => ({ details: data })
  });
}
