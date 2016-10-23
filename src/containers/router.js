import React from 'react';
import { connect } from 'react-redux';
import routerEngine from 'page';
import { navigationStart, navigationSuccess, navigationError } from '../actions/';
import * as constants from '../constants';

class Router extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			currentComponent: null,
			routeContext: {},
			pageData: {}
		};

		Object.keys(this.props.config).forEach(routePath => {
			routerEngine(routePath, this.handleRouteChange.bind(this, this.props.config[routePath]));
		});

		routerEngine('*', (ctx) => {
			console.warn('Route not handled:', ctx);
		});
	}

	static navTo(url) {
		routerEngine(url);
	}

	handleRouteChange(pageModulePath, routeContext) {
		console.debug('handleRouteChange# Navigating to:', pageModulePath, routeContext);
	
		// TODO Add a loader so the user knows we're doing something
		this.props.dispatch(navigationStart());

		require.ensure([], require => {
			require(`bundle!../${pageModulePath}`)(pageModule => {
				const PageComponent = pageModule.default;

				this.props.dispatch(PageComponent.navigationAction.bind(null, routeContext)())
				// this.props.dispatch(asyncAction())
					.then(() => {
						this.setState({
							currentComponent: PageComponent
						}, () => {
							this.props.dispatch(navigationSuccess());
						});
					})
					.catch((error) => {
						console.error('handleRouteChange# Navigation error:', error);
						console.error(error.stack);
						this.props.dispatch(navigationError(error));
					});

				// this.props.dispatch(navigate(routeContext, PageComponent.loadPageData.bind(null, routeContext, this.props.dispatch)))
				// 	.then(pageData => {
				// 		this.setState({
				// 			currentComponent: PageComponent
				// 			// routeContext,
				// 			// pageData
				// 		}, () => {
				// 			this.props.dispatch(navigation('end'));
				// 		});
				// 	})
				// 	.catch(err => {
				// 		console.error('handleRouteChange# Navigation error:', err);
				// 		console.error(err.stack);
				// 		this.props.dispatch(navigation('end'));
				// 	});

				// PageComponent.loadPageData(routeContext)
				// 	.then(pageData => {
				// 		this.setState({
				// 			currentComponent: PageComponent,
				// 			routeContext,
				// 			pageData
				// 		}, () => {
				// 			// this.props.navigationEnd();
				// 		});
				// 	})
				// 	.catch(err => {
				// 		console.error('handleRouteChange# Navigation error:', err);
				// 		console.error(err.stack);
				// 	});
			});
		});		
	}

	componentDidMount() {
		// Sync with browser location
		routerEngine({
			dispatch: true, // fire routing on page load
			hashbang: false	// whether using old fashioned hash URLs or not
		});
	}

	render() {
		if (!this.state.currentComponent) {
			return (<div></div>);
		} else {
			// Scroll to top after transitioning to a new page
			setTimeout(window.scrollTo.bind(window, 0, 0), 4);

			// Second parameter is props; Third parameter is children
			return React.createElement(this.state.currentComponent, {
				// request: {
				// 	pathname: this.state.routeContext.pathname,
				// 	path: this.state.routeContext.path,
				// 	params: this.state.routeContext.params,
				// 	queryString: this.state.routeContext.querystring
				// },
				// pageData: this.state.pageData
			});
		}
	}
}

Router.propTypes = {
	config: React.PropTypes.object.isRequired
};

export default connect()(Router);
