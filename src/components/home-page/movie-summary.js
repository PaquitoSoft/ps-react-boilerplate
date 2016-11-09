import React from 'react';
import { Link } from 'react-router';

import './movie-summary.css';

export default function MovieSummary({ movie }) {
  return (
    <div className="column movie-summary">
      <div className="ui segment">
        <Link to={`/movie/${movie.id}/${movie.title.toLowerCase().replace(/ /g, '-')}`}>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
        </Link>
      </div>
    </div>
  );
}
