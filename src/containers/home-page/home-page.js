import React from 'react';
import { connect } from 'react-redux';
import { getTrendingRepos } from '../../api/github';
import { searchRepos } from '../../actions/';
import Router from '../router';
import ReposList from '../../components/repos-list';

import './home-page.css';

export class HomePage extends React.Component {

	static navigationAction(requestContext) {
		console.info('Home Page request context:', requestContext);
		const topic = requestContext.querystring.match(/^q=(.*)$/);

		return searchRepos(topic ? topic[1] : undefined);
	}

	constructor(props) {
		super(props);
		this.searchRepos = this.searchRepos.bind(this);
	}

	searchRepos(event) {
		event.preventDefault();
		Router.navTo(`/?q=${this.searchInput.value}`);
	}

	render() {
		return (
			<div className="home-page">
				<form onSubmit={this.searchRepos}>
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
