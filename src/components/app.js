import React from 'react';

import Header from './layout/header';
import Footer from './layout/footer';

import './app.css';

function App({ children }) {
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

App.propTypes = {
  children: React.PropTypes.object.isRequired
};

export default App;
