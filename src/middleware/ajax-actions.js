function ajaxActionsMiddleware({ dispatch, getState }) {
	return next => action => { // eslint-disable-line
		const {
			types,
			callAPI,
			shouldCallApi = () => true,
			payload
		} = action;

		if (!types) {
			// Non interesting action: just let it be
			return next(action);
		}

		if (!Array.isArray(types) || types.length !== 3) {
			throw new Error('Expected an array of three string action types.');
		}

		if (typeof callAPI !== 'function') {
			throw new Error('Expected callAPI to be a function');
		}

		if (!shouldCallApi(getState())) {
			return next(action);
		}

		const [
			requestType,
			successType,
			errorType
		] = types;

		dispatch({
			type: requestType,
			payload: {
				request: payload.request
			}
		});

		return callAPI()
			.then(response => {
				dispatch(Object.assign({}, {
					type: successType,
					payload: { response }
				}));
			})
			.catch(err => {
				dispatch(Object.assign({}, {
					type: successType,
					payload: { error: err }
				}));
			});
	};
}

export default ajaxActionsMiddleware;
