import React from 'react';
import Router from './router';
import routes from '../config/routes-config';

export class App extends React.Component {

	render() {
		return (
			<div className="app-root">
				<div className="header">
					<h2>PaquitoSoft ReactJS boilerplate</h2>
				</div>
				<div className="body">
					<Router config={routes} />
				</div>
			</div>
		);
	}

}

export default App;
