import appConfig from '../config/app-config';
import { getJson } from '../plugins/ajax';

// const API_BASE_URL = 'https://api.themoviedb.org/3';
// const API_KEY = 'eddf5d49244134d1e874e1915d41d6e4';

const config = appConfig.tmdb;
  
// tmdb: {
//   apiBaseUrl: 'https://api.themoviedb.org/3',
//   apiKey: 'eddf5d49244134d1e874e1915d41d6e4'
// }
  
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
  return getJson(`${config.apiBaseUrl}/movie/${movieId}?api_key=${config.apiKey}&language=en-US`, {
    ttl: 3600 * 24 * 7
  });
}
