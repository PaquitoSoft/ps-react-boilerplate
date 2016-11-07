import { getJson } from '../plugins/ajax';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'eddf5d49244134d1e874e1915d41d6e4';

  
export function getTopRated() {
  return getJson(`${API_BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`, {
    ttl: 60
  });
}

export function getPopular() {
  return getJson(`${API_BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`, {
    ttl: 60
  });
}

export function getPremiers() {
  return getJson(`${API_BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US`, {
    ttl: 60
  });
}

export function getUpcoming() {
  return getJson(`${API_BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US`, {
    ttl: 60
  });
}

export function getMovieDetails(movieId) {
  return getJson(`${API_BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`, {
    ttl: 3600 * 24 * 7
  });
}
