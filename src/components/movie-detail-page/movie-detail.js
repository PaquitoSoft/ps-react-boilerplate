import React from 'react';
import { connect } from 'react-redux';
import { loadMovieDetails } from '../../actions/';

import './movie-detail.css';

function MovieDetailPage({ movie }) {
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
            <p>{movie.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

MovieDetailPage.navigationAction = function(requestContext) {
  console.log('MovieDetailPage::navigationAction:', requestContext);
  return loadMovieDetails(requestContext.routeParams.movieId);
};

function mapStateToProps(state) {
  return {
    movie: state.movieDetails
  };
}

export default connect(mapStateToProps)(MovieDetailPage);
