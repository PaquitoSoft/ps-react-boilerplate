class ReducerFactory {

	constructor(name) {
		this.name = name;
		this.actionsMap = {};
	}

	registerActionHandler(actionType, actionHandler) {
		this.actionsMap[actionType] = actionHandler;
	}

	defaultHandler(action, state) {
		return state;
	}

	createReducer() {
		return (state = {}, action) => {
			const handler = this.actionsMap[action.type] || this.defaultHandler;
			let newState = handler(action, state) || state;

			if (this.actionsMap['*']) {
				newState = this.actionsMap['*'](action, state);
			}

			return newState;
		};
	}
}

export default ReducerFactory;
