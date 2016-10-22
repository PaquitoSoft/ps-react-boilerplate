import appConfig from '../config/app-config';
import { getJson } from '../plugins/ajax';

export function getTrendingRepos(topic = 'javascript') {
	return getJson(`${appConfig.githubBaseUrl}/search/repositories?q=${topic}&sort=stars&order=desc`,
		{ ttl: 10 } // minutes
	)
}

export function getRepoDetails(repoName) {
	return getJson(`${appConfig.githubBaseUrl}/repos/${repoName}`, { ttl: 60 });
}
