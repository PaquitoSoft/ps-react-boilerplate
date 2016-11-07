import routerReducer from './router-reducer';
import simpleReducer from './simple-reducer';

export default function rootReducer(state, action) {
	let newState = JSON.parse(JSON.stringify(state));

  newState = routerReducer(newState, action);
	newState = simpleReducer(newState, action);

	return newState;
}
