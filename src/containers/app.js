import React from 'react';
import { connect } from 'react-redux';
import Router from './router';
import routes from '../config/routes-config';

import './app.css';

export class App extends React.Component {

	// render() {
	// 	return (
	// 		<div className="app-root">
	// 			<div className="header">
	// 				<h2>{this.props.appTitle}</h2>
	// 				{
	// 					this.props.isLoading &&
	// 					<div className="loader">Loading...</div>
	// 				}
	// 			</div>
	// 			<div className="body">
	// 				<Router config={routes} />
	// 			</div>
	// 		</div>
	// 	);
	// }

  render() {
    return (
      <div className="app-root">
        <div className="header">
          <h2>{this.props.appTitle}</h2>
          {
            this.props.isLoading &&
            <div className="loader">Loading...</div>
          }
        </div>
        <div className="body">
          {this.props.children}
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
	return {
		appTitle: state.appTitle,
		isLoading: state.isLoading
	}
}

export default connect(mapStateToProps)(App);
