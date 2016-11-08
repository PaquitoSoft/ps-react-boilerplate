import React from 'react';
import { connect } from 'react-redux';

import Header from './layout/header';
import Footer from './layout/footer';

import './app.css';

function App({ children }) {
  // TODO Loader (see small-shop-react)
  return (
    <div className="app-root">
      <Header />
      <div className="ui main text container">
        {children}
      </div>
      <Footer />
    </div>
  );
}

function mapStateToProps(state) {
	return {
		isLoading: state.isLoading
	};
}

export default connect(mapStateToProps)(App);
