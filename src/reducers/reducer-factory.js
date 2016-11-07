class ReducerFactory {

	constructor(name) {
		this.name = name;
		this.actionsMap = {};
	}

	handleAction(actionType, actionHandler) {
		this.actionsMap[actionType] = actionHandler;
	}

	defaultHandler(action, state) {
		return state;
	}

	toStandardReducer() {
		return (state = {}, action) => {
			const handler = this.actionsMap[action.type] || this.defaultHandler;
			return handler(action, state) || state;
		};
	}
}

export default ReducerFactory;
