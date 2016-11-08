import React from 'react';
import * as rr from 'react-redux';
import { Link } from 'react-router';
// import { filterMovies } from '../../actions/';

import './header.css';
import logo from './logo.png';

function createMoviesFilter(filterValue, filterName) {
  // TODO Get filterName from i18n store from filterValue
  return (
    <Link 
      to={{ pathname: '/', query: { filter: filterValue } }}
      className="item">
      {filterName}
    </Link>
  );
}

export default function Header() {
  return (
    <div className="header">
      <div className="ui fixed inverted menu">
        <div className="ui container">
          <a href="/" className="header item">
            <img className="logo" src={logo} />
            Klavo
          </a>
          
          <div className="ui simple dropdown item">
            Movies <i className="dropdown icon"></i>
              <div className="menu">
                {createMoviesFilter('premiers', 'Estrenos')}
                {createMoviesFilter('more-viewed', 'Más vistas')}
                {createMoviesFilter('best-rated', 'Mejor valoradas')}
                {createMoviesFilter('new', 'Recientes')}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
