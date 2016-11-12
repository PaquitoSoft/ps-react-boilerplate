import * as constants from '../constants';

export default Object.freeze({
  'header.appName': {
    en: 'Klavo'
  },  
  'header.movies-selector': {
    en: 'Movies',
    es: 'Películas'
  },

  'movie-detail.overview': {
    en: 'Overview:',
    es: 'Sinopsis:'
  },
  'movie-detail.rating': {
    en: 'Rating',
    es: 'Puntuación'
  },
  'movie-detail.duration-label': {
    en: 'Duration',
    es: 'Duración'
  },
  'movie-detail.duration-metric': {
    en: '(min.)'
  },
  'movie-detail.trailers': {
    en: 'Trailers:'
  },

  [`shared.movies-filter.${constants.MOVIES_FILTER_TOP_RATED}`]: {
    en: 'Best rated',
    es: 'Mejor valoradas'
  },
  [`shared.movies-filter.${constants.MOVIES_FILTER_POPULAR}`]: {
    en: 'Pupular',
    es: 'Populares'
  },
  [`shared.movies-filter.${constants.MOVIES_FILTER_PREMIER}`]: {
    en: 'Now playing',
    es: 'Estrenos'
  },
  [`shared.movies-filter.${constants.MOVIES_FILTER_UPCOMING}`]: {
    en: 'Upcoming',
    es: 'Lo que viene'
  }  
  
});
