import App from '../components/app';

// export default Object.freeze({
// 	// Route:page-component-path (Base path: /src/js/)
// 	'/': 'components/home-page/home-page',
// 	'/repo/:repoName': 'containers/detail-page/detail-page'
// });


function createRouteConfig(path, componentPath, store) {
  return {
    path,
    dispatch: store.dispatch,
    getComponent(nextState, done) {
      console.log('Loading component:', componentPath);
      require.ensure([], require => { // eslint-disable-line
        const Component = require(`../components/${componentPath}`).default;

        // const actions = [];
        // const reducer = (state) => state;
        // injectReducer(store, { movies: reducer });
        console.info('---> Component loaded:', componentPath, nextState);
        
        const requestContext = {
          routeParams: nextState.params,
          queryStringParams: nextState.location.query,
          hash: nextState.location.hash
        };
        
        // this.navigationAction = Component.navigationAction;
        // done(null, Component);
        store.dispatch(Component.navigationAction(requestContext))
          .then(() => {
            console.info('Action dispatched. Rendering component...', componentPath);
            done(null, Component)
          })
          .catch(err => {
            console.error('RoutesConfig::getComponent# Error dispatching navigation action:', err);
            console.log(err.stack);
          });
      });
    },
    onEnter(nextState, replace, callback) {
      console.info(`${componentPath} onEnter: ${nextState}`);
      const requestContext = {
        routeParams: nextState.params,
        queryStringParams: nextState.location.query,
        hash: nextState.location.hash
      };
      
      // this.dispatch(this.navigationAction(requestContext))
      //   .then(callback)
      //   .catch(callback);
      callback();
    },
    onChange(prevState, nextState, replace, callback){
      console.info(`${componentPath} onChange: ${prevState} - ${nextState}`);
      callback();
    },
    onLeave(prevState) {
      console.info(`${componentPath} onLeave: ${prevState}`);
    }
  };
}

export function getRoutes(store) {
  console.info('====> Creating routes configuration...');
  return {
		component: App,
		childRoutes: [
			createRouteConfig('/', 'home-page/home', store),
			createRouteConfig('/movie/:movieId/:slug', 'movie-detail-page/movie-detail', store)
		]
	};
}
