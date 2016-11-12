import Logdown from 'logdown';
import App from '../components/app';

const logger = new Logdown({prefix: 'RoutesConfig'});

function createRouteConfig(path, componentPath, store) {
  return {
    path,
    dispatch: store.dispatch,
    getComponent(nextState, done) {
      logger.log('Loading component:', componentPath);
      require.ensure([], require => { // eslint-disable-line
        const Component = require(`../components/${componentPath}`).default;

        // TODO Load not only component but all its related assets
        // const actions = [];
        // const reducer = (state) => state;
        // injectReducer(store, { movies: reducer });
        logger.info('---> Component loaded:', componentPath, nextState);
        
        const requestContext = {
          routeParams: nextState.params,
          queryStringParams: nextState.location.query,
          hash: nextState.location.hash
        };
        
        store.dispatch(Component.navigationAction(requestContext))
          .then(() => {
            logger.info('Action dispatched. Rendering component...', componentPath);
            done(null, Component);
          })
          .catch(err => {
            logger.error('RoutesConfig::getComponent# Error dispatching navigation action:', err);
            logger.log(err.stack);
          });
      });
    },
    onEnter(nextState/*, replace, callback*/) {
      logger.info(`${componentPath} onEnter: ${nextState}`);
      document.body.scrollTop = 0;
    },
    // onChange(prevState, nextState, replace, callback){
    //   logger.info(`${componentPath} onChange: ${prevState} - ${nextState}`);
    //   callback();
    // },
    // onLeave(prevState) {
    //   logger.info(`${componentPath} onLeave: ${prevState}`);
    // }
  };
}

export function getRoutes(store) {
  return {
		component: App,
		childRoutes: [
			createRouteConfig('/', 'home-page/home', store),
			createRouteConfig('/movie/:movieId/:slug', 'movie-detail-page/movie-detail', store)
		]
	};
}
