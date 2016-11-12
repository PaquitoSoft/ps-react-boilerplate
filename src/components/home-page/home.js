import React from 'react';
import { connect } from 'react-redux';
import Logdown from 'logdown';
import { loadMoviesList, loadTopRated } from '../../actions/';

import MovieSummary from './movie-summary';

const logger = new Logdown({prefix: 'HomePage'});

function HomePage({ movies }) {
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
  logger.log('HomePage::navigationAction:', requestContext);
  // return loadMoviesList();
  return loadTopRated();
};

HomePage.propTypes = {
  movies: React.PropTypes.array.isRequired
};


function mapStateToProps(state) {
  return {
    movies: state.moviesList
  };
}

export default connect(mapStateToProps)(HomePage);
