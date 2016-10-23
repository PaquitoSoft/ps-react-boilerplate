import { AJAX_REQUEST, AJAX_ERROR } from '../actions/types';

// {
// 	type: actionTypes.REPO_DETAILS,
// 	meta: {
// 		isAjaxAction: true,
// 		fetchOperation: getRepoDetails(repoName),
// 		successPayload: (data) => ({ repoDetails: data })
// 	}
// }

function ajaxActionsMiddleware({ dispatch, getState }) {
	return next => action => { // eslint-disable-line
	
		if (action.meta && action.meta.isAjaxAction) {

			dispatch({ type: AJAX_REQUEST });

			meta.fetchOperation()
				.then(data => {
					dispatch({
						type: action.type,
						payload: action.meta.successPayload(data)
					})
				})
				.catch(error => {
					dispatch({
						type: AJAX_ERROR,
						payload: {
							error
						}
					})
				});

		} else {
			return next(action);
		}
	};
}

// function ajaxActionsMiddleware({ dispatch, getState }) {
// 	return next => action => { // eslint-disable-line
// 		const {
// 			types,
// 			callAPI,
// 			shouldCallApi = () => true,
// 			payload
// 		} = action;

// 		if (!types) {
// 			// Non interesting action: just let it be
// 			return next(action);
// 		}

// 		if (!Array.isArray(types) || types.length !== 3) {
// 			throw new Error('Expected an array of three string action types.');
// 		}

// 		if (typeof callAPI !== 'function') {
// 			throw new Error('Expected callAPI to be a function');
// 		}

// 		if (!shouldCallApi(getState())) {
// 			return next(action);
// 		}

// 		const [
// 			requestType,
// 			successType,
// 			errorType
// 		] = types;

// 		dispatch({
// 			type: AJAX_REQUEST
// 			// payload: {
// 			// 	request: payload.request
// 			// }
// 		});

// 		return callAPI()
// 			.then(response => {
// 				dispatch(Object.assign({}, {
// 					type: successType,
// 					payload: { response }
// 				}));
// 			})
// 			.catch(err => {
// 				dispatch(Object.assign({}, {
// 					type: AJAX_ERROR,
// 					payload: { error: err }
// 				}));
// 			});
// 	};
// }

export default ajaxActionsMiddleware;
