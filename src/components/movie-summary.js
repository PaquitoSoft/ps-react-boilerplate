import React from 'react';
import { Link } from 'react-router';
import './repos-list.css';

export default function MovieSummary({ movie }) {
  return (
    <li className="repo-summary">
      <Link to={`/movie/${movie.id}/${movie.title.toLowerCase().replace(/ /g, '-')}`}>{movie.title}</Link>
      <span className="repo-stars">(Popularity:<span className="repo-stars-count">{movie.vote_average})</span></span>
    </li>
  );
}
