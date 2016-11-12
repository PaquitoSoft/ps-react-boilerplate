import React from 'react';
import { connect } from 'react-redux';
import Logdown from 'logdown';
import { getText } from '../../plugins/i18n';
import { loadMoviesList } from '../../actions/';

import MovieSummary from './movie-summary';

const logger = new Logdown({prefix: 'HomePage'});

function HomePage({ movies, filter }) {
  return (
    <div className="home-page">
      <h1>{getText(`shared.movies-filter.${filter}`)}</h1>
      <div className="ui four column grid">
        {movies.map((movie, index) => {
          return (<MovieSummary movie={movie} key={index} />);
        })}
      </div>
    </div>
  );
}

HomePage.navigationAction = function(requestContext) {
  console.log('HomePage::navigationAction:', requestContext);
  return loadMoviesList(requestContext.queryStringParams.filter);
};

HomePage.propTypes = {
  movies: React.PropTypes.array.isRequired,
  filter: React.PropTypes.string.isRequired
};


function mapStateToProps(state) {
  return {
    movies: state.moviesList,
    filter: state.moviesFilter
  };
}

export default connect(mapStateToProps)(HomePage);
