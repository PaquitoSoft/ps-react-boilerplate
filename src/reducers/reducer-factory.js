import NProgress from 'nprogress';
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
            NProgress.start();
            break;
          case constants.AJAX_STATUS_SUCCESS:
            state.isLoading = false;
            state = actionHandler(action, state);
            NProgress.done();
            break;
          case constants.AJAX_STATUS_ERROR:
            state.isLoading = false;
            NProgress.done();
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
