import React from 'react';

export default function ReposList({ repos, onRepoClick }) {
	const list = repos.map((repoInfo, index) => {
		return (
			<li className="repo-summary" key={index}>
				<a href={`/detail/${repoInfo.full_name}`}>{repoInfo.name}</a>
				<span>Stars:<span className="repo-stars">${repoInfo.stargazers_count}</span></span>
			</li>
		);
	});
	return (
		<ul className="repos-list">
			{list}
		</ul>
	);
}
