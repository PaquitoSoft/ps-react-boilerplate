import * as constants from '../constants';

class ReducerFactory {

	constructor(name) {
		this.name = name;
		this.actionsMap = {};
	}

	handleAction(actionType, actionHandler) {
		this.actionsMap[actionType] = actionHandler;
	}

	handleNavigationAction(actionType, actionHandler) {
		this.actionsMap[actionType] = (action, state) => {
			switch(action.meta.ajaxStatus) {
          case constants.AJAX_STATUS_REQUEST:
            state.isLoading = true;
            console.info('Show loading...');
            break;
          case constants.AJAX_STATUS_SUCCESS:
            state.isLoading = false;
            console.info('Hide loading...');
            state = actionHandler(action, state);
            console.log('Navigation action executed.');
            break;
          case constants.AJAX_STATUS_ERROR:
            console.info('Hide loading...');
            state.isLoading = false;
            break;
      }
      return state;
		};
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
