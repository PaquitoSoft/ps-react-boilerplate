import React from 'react';
import { connect } from 'react-redux';
import { getTrendingRepos } from '../../api/github';
import { searchRepos } from '../../actions/';
import ReposList from '../../components/repos-list';

import './home-page.css';

export class HomePage extends React.Component {

	static navigationAction(requestContext) {
		return searchRepos();
	}

	searchRepos(event) {
		event.preventDefault();
		console.info('Search for:', this.searchInput.value);
		this.props.searchRepos(this.searchInput.value);
	}

	render() {
		return (
			<div className="home-page">
				<form onSubmit={this.searchRepos.bind(this)}>
					<input
						type="text"
						autoFocus="true"
						ref={(node) => this.searchInput = node }
					/>
					<button 
						type="submit">
						Search
					</button>
				</form>
				<hr/>
				<ReposList repos={this.props.repos} />
			</div>
		);
	}

}

HomePage.propTypes = {
	repos: React.PropTypes.array.isRequired
}

function mapStateToProps(state) {
	return { 
		repos: state.repos
	}
}

export default connect(mapStateToProps, { searchRepos })(HomePage);
