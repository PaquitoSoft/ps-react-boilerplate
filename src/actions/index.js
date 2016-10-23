import * as actionTypes from './types';
import * as constants from '../constants';
import { getTrendingRepos, getRepoDetails } from '../api/github';

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
			type: actionTypes.AJAX_REQUEST
			// meta: {
			// 	ajaxStatus: constants.AJAX_STATUS_REQUEST
			// }
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
						// meta: {
						// 	ajaxStatus: constants.AJAX_STATUS_ERROR
						// },
						payload: {
							error
						}
					});
					reject(error);
				});
		});
	};
}

export function navigate(routeContext, loader) {
	const request = {
		pathname: routeContext.pathname,
		path: routeContext.path,
		params: routeContext.params,
		queryString: routeContext.querystring
	}

	return {
		types: [ 
			actionTypes.NAVIGATION_REQUEST,
			actionTypes.NAVIGATION_SUCCESS, 
			actionTypes.NAVIGATION_ERROR 
		],
		callAPI: loader,
		payload: { request }
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

export function searchRepos(topic) {
	// return (dispatch) => {
	// 	dispatch({
	// 		type: actionTypes.SEARCH_REPOS,
	// 		meta: {
	// 			status: constants.ACTION_STATUS_REQUEST
	// 		}
	// 	});

	// 	return getTrendingRepos(topic)
	// 		.then(data => {
	// 			dispatch({
	// 				type: actionTypes.SEARCH_REPOS,
	// 				meta: {
	// 					status: constants.ACTION_STATUS_SUCCESS
	// 				},
	// 				payload: {
	// 					repos: data.items
	// 				}
	// 			});
	// 		})
	// 		.catch(error => {
	// 			dispatch({
	// 				type: actionTypes.SEARCH_REPOS,
	// 				meta: {
	// 					status: constants.ACTION_STATUS_ERROR
	// 				},
	// 				payload: {
	// 					error
	// 				}
	// 			});
	// 		});

	// }

	return ajaxAction({
		type: actionTypes.SEARCH_REPOS,
		fetchOperation: () => getTrendingRepos(topic),
		successPayload: (data) => ({ repos: data.items })
	});

}

export function repoDetails(repoName) {
	// return dispatch => {
	// 	dispatch({
	// 		type: actionTypes.REPO_DETAILS,
	// 		meta: {
	// 			status: constants.ACTION_STATUS_REQUEST
	// 		}
	// 	});

	// 	return getRepoDetails(repoName)
	// 		.then(data => {
	// 			dispatch({
	// 				type: actionTypes.REPO_DETAILS,
	// 				meta: {
	// 					status: constants.ACTION_STATUS_SUCCESS
	// 				},
	// 				payload: {
	// 					repoDetails: data
	// 				}
	// 			});
	// 		})
	// 		.catch(error => {
	// 			dispatch({
	// 				type: actionTypes.REPO_DETAILS,
	// 				meta: {
	// 					status: constants.ACTION_STATUS_SUCCESS
	// 				},
	// 				payload: {
	// 					repos: data.items
	// 				}
	// 			});
	// 		});

	// };

	return ajaxAction({
		type: actionTypes.REPO_DETAILS,
		fetchOperation: () => getRepoDetails(repoName),
		successPayload: (data) => ({ repoDetails: data })
	});
	
}
