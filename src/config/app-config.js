const devConfig = Object.freeze({
	githubBaseUrl: 'https://api.github.com'
});

const productionConfig = Object.freeze({
	githubBaseUrl: 'https://api.github.com'
});

export default process.env.NODE_ENV === 'production' ? productionConfig : devConfig;
