import appConfig from '../config/app-config';
import { getJson } from '../plugins/ajax';

const config = appConfig.tmdb;
  
export function getTopRated() {
  return getJson(`${config.apiBaseUrl}/movie/top_rated?api_key=${config.apiKey}&language=en-US`, {
    ttl: 60
  });
}

export function getPopular() {
  return getJson(`${config.apiBaseUrl}/movie/popular?api_key=${config.apiKey}&language=en-US`, {
    ttl: 60
  });
}

export function getPremiers() {
  return getJson(`${config.apiBaseUrl}/movie/now_playing?api_key=${config.apiKey}&language=en-US`, {
    ttl: 60
  });
}

export function getUpcoming() {
  return getJson(`${config.apiBaseUrl}/movie/upcoming?api_key=${config.apiKey}&language=en-US`, {
    ttl: 60
  });
}

export function getMovieDetails(movieId) {
  return getJson(`${config.apiBaseUrl}/movie/${movieId}?append_to_response=videos&api_key=${config.apiKey}&language=en-US`, {
    ttl: 3600 * 24 * 7
  });
}
