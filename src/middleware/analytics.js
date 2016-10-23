
const analyticsMiddleware = store => next => action => { // eslint-disable-line
	if (action.meta && action.meta.analytics) {
		// Send data to Analytics
		console.info(`Send beacon to Google Analytics. Event ${action.meta.analytics.event} - Value: ${action.meta.analytics.value}`);
	}
	return next(action);
};

export default analyticsMiddleware;
