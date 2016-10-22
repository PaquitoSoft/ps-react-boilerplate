import * as actionTypes from './types';

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
		shouldCallAPI: state => (false),
		callAPI: loader,
		payload: { request }
	};
}