import React from 'react';
import { connect } from 'react-redux';
import Router from './router';
import routes from '../config/routes-config';

import './app.css';

export class App extends React.Component {

	render() {
		return (
			<div className="app-root">
				<div className="header">
					<h2>PaquitoSoft ReactJS boilerplate</h2>
					{this.props.isLoading ?
						<div className="loader">Loading...</div>
						:
						null
					}
				</div>
				<div className="body">
					<Router config={routes} />
				</div>
			</div>
		);
	}

}

export default connect(state => {
	return { isLoading: state.isLoading }
})(App);
