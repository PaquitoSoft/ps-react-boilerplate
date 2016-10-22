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
			return handler(action, state) || state;
		};
	}
}

export default ReducerFactory;
