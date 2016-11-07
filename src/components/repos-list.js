import React from 'react';
import { Link } from 'react-router';

import './repos-list.css';

export default function ReposList({ repos }) {
	// <a href={`/repo/${repoInfo.full_name.replace('/', '-')}`}>{repoInfo.name}</a>
	const list = repos.map((repoInfo, index) => {
		return (
			<li className="repo-summary" key={index}>
				<Link to={`/repo/${repoInfo.full_name.replace('/', '-')}`}>{repoInfo.name}</Link>
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
