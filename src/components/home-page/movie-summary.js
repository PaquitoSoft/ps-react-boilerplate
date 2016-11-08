import React from 'react';

import './movie-summary.css';

export default function MovieSummary({ movie }) {
  return (
    <div className="column movie-summary">
      <div className="ui segment">
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
      </div>
    </div>
  );
}
