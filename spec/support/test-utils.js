import sinon from 'sinon';

function noop() {}

export function fakeDomEvent() {
	return {
		preventDefault: noop
	};
}

export function fakeProps(props) {
	return Object.assign({
		dispatch: noop
	}, props);
}

export function asyncDispatch(asyncAction) {
	const _dispatch = sinon.spy();
	asyncAction(_dispatch, fakeStoreState);
	return _dispatch;
}
