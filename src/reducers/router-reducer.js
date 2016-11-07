import ReducerFactory from './reducer-factory';
import * as actionTypes from '../actions/types';
import * as constants from '../constants';

const routerReducer = new ReducerFactory('router-reducer');

// routerReducer.handleAction('LOCATION_CHANGE', (action, state) => {
//   let routingState = state.routing || {};
//   routingState.locationBeforeTransitions = action.payload;
//   state.routingState = routingState;
//   return state;
// });

export default routerReducer.toStandardReducer();
