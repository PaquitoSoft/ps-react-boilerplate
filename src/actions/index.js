import * as actionTypes from './types';
import * as constants from '../constants';
import { getTrendingRepos, getRepoDetails } from '../api/github';

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

export function searchRepos(topic) {
	return (dispatch) => {
		dispatch({
			type: actionTypes.SEARCH_REPOS,
			meta: {
				status: constants.ACTION_STATUS_REQUEST
			}
		});

		return getTrendingRepos(topic)
			.then(data => {
				dispatch({
					type: actionTypes.SEARCH_REPOS,
					meta: {
						status: constants.ACTION_STATUS_SUCCESS
					},
					payload: {
						repos: data.items
					}
				});
			})
			.catch(error => {
				dispatch({
					type: actionTypes.SEARCH_REPOS,
					meta: {
						status: constants.ACTION_STATUS_ERROR
					},
					payload: {
						error
					}
				});
			});	
	}

}

export function repoDetails(repoName) {
	return dispatch => {
		dispatch({
			type: actionTypes.REPO_DETAILS,
			meta: {
				status: constants.ACTION_STATUS_REQUEST
			}
		});

		return getRepoDetails(repoName)
			.then(data => {
				dispatch({
					type: actionTypes.REPO_DETAILS,
					meta: {
						status: constants.ACTION_STATUS_SUCCESS
					},
					payload: {
						repoDetails: data
					}
				});
			})
			.catch(error => {
				dispatch({
					type: actionTypes.REPO_DETAILS,
					meta: {
						status: constants.ACTION_STATUS_SUCCESS
					},
					payload: {
						repos: data.items
					}
				});
			});

	};
}
