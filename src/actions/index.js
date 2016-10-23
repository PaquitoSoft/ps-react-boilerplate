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
			type: actionTypes.AJAX_REQUEST,
			meta: Object.assign({
				action: config.type
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

export function searchRepos(topic) {
	let meta = {};
	if (topic) {
		meta.analytics = {
			event: 'search-repo',
			value: topic 
		};
	}

	return ajaxAction({
		type: actionTypes.SEARCH_REPOS,
		meta,
		fetchOperation: () => getTrendingRepos(topic),
		successPayload: (data) => ({ repos: data.items })
	});

}

export function repoDetails(repoName) {
	return ajaxAction({
		type: actionTypes.REPO_DETAILS,
		fetchOperation: () => getRepoDetails(repoName),
		successPayload: (data) => ({ repoDetails: data })
	});
	
}
