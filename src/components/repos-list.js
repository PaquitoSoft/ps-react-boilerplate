import React from 'react';

import './repos-list.css';

export default function ReposList({ repos, onRepoClick }) {
	const list = repos.map((repoInfo, index) => {
		return (
			<li className="repo-summary" key={index}>
				<a href={`/repo/${repoInfo.full_name.replace('/', '-')}`}>{repoInfo.name}</a>
				<span className="repo-stars">(Stars:<span className="repo-stars-count">{repoInfo.stargazers_count})</span></span>
			</li>
		);
	});
	return (
		<ul className="repos-list">
			{list}
		</ul>
	);
}
