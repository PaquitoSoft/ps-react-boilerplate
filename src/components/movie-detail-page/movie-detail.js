import React from 'react';
import { connect } from 'react-redux';
import Logdown from 'logdown';
import { loadMovieDetails } from '../../actions/';
import { getText } from '../../plugins/i18n';

import './movie-detail.css';

const logger = new Logdown({prefix: 'MovieDetailPage'});

function createGenresList(genres = []) {
  return genres.map((genre, index) => {
    return (<span className="ui basic label" key={index}>{genre.name}</span>);
  });
}

function createTrailersList(trailers = []) {
  const components = trailers.map((trailer, index) => {
    return (
      <div className="item" key={index}>
        <i className="youtube big icon"></i>
        <div className="content">
          <a href={`https://www.youtube.com/watch?v=${trailer.key}`} target="_blank">{trailer.name}</a>
        </div>
      </div>
    );
  });
  return (
    <div className="ui list trailers">
      {components}
    </div>
  );
}

function MovieDetailPage({ movie }) {
  // movie.popularity 4.474278
  // movie.vote_average 8.1
  // movie.runtime (minutes)
  
  
  console.log(movie);
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
            <h1 className="ui dividing header">
              <span className="title">{movie.title}</span>
              <span className="year">{movie.release_date.split('-')[0]}</span>
            </h1>
            <div className="genres">
              {createGenresList(movie.genres)}
            </div>
            <div className="overview">
                <h4>{getText('movie-detail.overview')}</h4>
                <p>{movie.overview}</p>
            </div>
            <div className="stats">
              <div className="ui teal label rating">{getText('movie-detail.rating')}<span>{movie.vote_average}</span></div>
              <div className="ui blue label duration">
                <span>{getText('movie-detail.duration-label')}</span>
                <span className="detail">{movie.runtime}</span>
                <span>{getText('movie-detail.duration-metric')}</span>
              </div>
            </div>
          </div>
          
          {
            !!movie.videos.length &&
            <div className="ui segment">
              <h3 className="ui dividing header">{getText('movie-detail.trailers')}</h3>
              {createTrailersList(movie.videos)}
            </div>
          }
          
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
