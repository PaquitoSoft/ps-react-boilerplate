// const devConfig = Object.freeze({
// 	githubBaseUrl: 'https://api.github.com',
//   tmdb: {
//     apiBaseUrl: 'https://api.themoviedb.org/3',
//     apiKey: 'eddf5d49244134d1e874e1915d41d6e4'
//   }
// });
// 
// const productionConfig = Object.freeze({
// 	githubBaseUrl: 'https://api.github.com',
//   tmdb: {
//     apiBaseUrl: 'https://api.themoviedb.org/3',
//     apiKey: 'eddf5d49244134d1e874e1915d41d6e4'
//   }
// });
// 
// export default process.env.NODE_ENV === 'production' ? productionConfig : devConfig;

export default Object.freeze({
  tmdb: {
    apiBaseUrl: 'https://api.themoviedb.org/3',
    apiKey: 'eddf5d49244134d1e874e1915d41d6e4'
  }
});
