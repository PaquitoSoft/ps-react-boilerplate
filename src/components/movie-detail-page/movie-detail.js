import React from 'react';
import { connect } from 'react-redux';
import Logdown from 'logdown';
import { loadMovieDetails } from '../../actions/';

import './movie-detail.css';

const logger = new Logdown({prefix: 'MovieDetailPage'});

function MovieDetailPage({ movie }) {
  // movie.genres[0].name
  // movie.popularity 4.474278
  // movie.vote_average 8.1
  // movie.release_date
  // movie.runtime (minutes)
  return (
    <div className="movie-detail-page">
      <div className="ui two column grid">
        <div className="column movie-poster-section">
          <div className="ui segment">
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          </div>
        </div>
        <div className="column movie-info-section">
          <div className="ui segment">
            <h1 className="ui dividing header">{movie.title}</h1>
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

MovieDetailPage.navigationAction = function(requestContext) {
  logger.log('MovieDetailPage::navigationAction:', requestContext);
  return loadMovieDetails(requestContext.routeParams.movieId);
};

MovieDetailPage.propTypes = {
  movie: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    movie: state.movieDetails
  };
}

export default connect(mapStateToProps)(MovieDetailPage);
