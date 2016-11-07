import App from '../containers/app';

export default Object.freeze({
	// Route:page-component-path (Base path: /src/js/)
	'/': 'containers/home-page/home-page',
	'/repo/:repoName': 'containers/detail-page/detail-page'
});


function createRouteConfig(path, componentPath, store) {
  return {
    path,
    dispatch: store.dispatch,
    getComponent(nextState, done) {
      console.log('Loading component:', componentPath);
      require.ensure([], require => { // eslint-disable-line
        const Component = require(`../containers/${componentPath}`).default;

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
          .catch(done);
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
			createRouteConfig('/', 'home-page/home-page', store),
			createRouteConfig('/repo/:repoName', 'detail-page/detail-page', store),
      createRouteConfig('/movie/:movieId/:slug', 'detail-page/detail-page', store)
		]
	};
}
