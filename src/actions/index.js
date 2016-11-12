import * as actionTypes from './types';
import * as constants from '../constants';
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
	return (dispatch, getState) => {
		dispatch({
			type: config.type,
			meta: Object.assign({
				ajaxStatus: constants.AJAX_STATUS_REQUEST
			}, config.meta)
		});

		return new Promise((resolve, reject) => {		
			config.fetchOperation(getState())
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
						type: config.type,
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

export function loadMoviesList(filter = constants.MOVIES_FILTER_PREMIER) {
  return ajaxAction({
    type: actionTypes.LOAD_MOVIES_LIST,
    fetchOperation: () => moviesLoaderMap[filter](),
    successPayload: data => ({ movies: data.results, filter })
  });
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
    successPayload: data => {
      let details = data;
      details.videos = details.videos.results.length ? details.videos.results : [];
      return { details };
    }
  });
}
