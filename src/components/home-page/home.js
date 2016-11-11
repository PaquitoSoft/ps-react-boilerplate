import React from 'react';
import { connect } from 'react-redux';
import { loadMoviesList, loadTopRated } from '../../actions/';

import MovieSummary from './movie-summary';

function HomePage({ movies }) {
  console.log('Rendering HomePage component...');
  return (
    <div className="home-page">
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
  // return loadMoviesList();
  return loadTopRated();
};

function mapStateToProps(state) {
  return {
    movies: state.moviesList
  };
}

export default connect(mapStateToProps)(HomePage);
