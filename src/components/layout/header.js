import React from 'react';
import { Link } from 'react-router';
import * as constants from '../../constants';
import { getText } from '../../plugins/i18n';

import './header.css';
import './nprogress.css';
import logo from './logo.png';

const moviesSections = [
  constants.MOVIES_FILTER_PREMIER = 'premier',
  constants.MOVIES_FILTER_POPULAR = 'popular',
  constants.MOVIES_FILTER_TOP_RATED = 'top-rated',
  constants.MOVIES_FILTER_UPCOMING = 'upcoming'
];

function createMoviesFilter(filter, index) {
  return (
    <Link 
      to={{ pathname: '/', query: { filter: filter } }}
      className="item"
      key={index}>
      {getText(`shared.movies-filter.${filter}`)}
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
                {moviesSections.map(createMoviesFilter)}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
