import { AJAX_REQUEST, AJAX_ERROR } from '../actions/types';

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

export default ajaxActionsMiddleware;
