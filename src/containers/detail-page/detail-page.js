import React from 'react';
import { connect } from 'react-redux';
import { getRepoDetails } from '../../api/github';
import { repoDetails } from '../../actions/';

import './detail-page.css';

export class DetailPage extends React.Component {

	static navigationAction(requestContext) {
		return repoDetails(requestContext.params.repoName.replace('-', '/'));
	}

	constructor(props) {
		super(props);
		this.backToHome = this.backToHome.bind(this);
	}

	backToHome(event) {
		event.preventDefault();
		history.back();
	}

	render() {
		const repo = this.props.repoDetails;
		return (
			<div className="detail-page">
				<p>
					Repo name:
					<span className="repo-name">{repo.name}</span>
				</p>
				<p>
					Author: <img src={repo.owner.avatar_url} />
				</p>				
				<p>
					Description: {repo.description}
				</p>
				<p>
					<a href={repo.html_url} target="_blank">GitHub URL</a>
				</p>
				<p>
					<a href={repo.homepage} target="_blank">Homepage</a>
				</p>
				<br/>
				<p>
					<a href="/" onClick={this.backToHome} target="_self">Back to Home page</a>
				</p>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		repoDetails: state.repoDetails
	};
}

export default connect(mapStateToProps)(DetailPage);
