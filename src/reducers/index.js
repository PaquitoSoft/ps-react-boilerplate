import simpleReducer from './simple-reducer';

export default function rootReducer(state, action) {
	let newState = JSON.parse(JSON.stringify(state));

  newState = simpleReducer(newState, action);

	return newState;
}
