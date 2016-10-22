
const analyticsMiddleware = store => next => action => { // eslint-disable-line
	if (action.meta && action.meta.analytics) {
		// TODO Send data to Analytics
	}
	return next(action);
};

export default analyticsMiddleware;
