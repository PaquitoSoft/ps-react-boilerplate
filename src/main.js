import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from './store';
import App from './containers/app';

const app = (
	<Provider store={createStore()}>
		<App />
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));
