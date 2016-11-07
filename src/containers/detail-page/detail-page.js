import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getRepoDetails } from '../../api/github';
import { repoDetails, loadMovieDetails } from '../../actions/';

import './detail-page.css';

export class DetailPage extends React.Component {

	static navigationAction(requestContext) {
    // return repoDetails(requestContext.routeParams.repoName.replace('-', '/'));
    console.log('=====>', requestContext);
    return loadMovieDetails(requestContext.routeParams.movieId);
	}

	constructor(props) {
		super(props);
		this.backToHome = this.backToHome.bind(this);
	}

  // componentDidMount() {
  //   console.log(this.props);
  //   this.props.repoLoader(this.props.routeParams.repoName.replace('-', '/'));
  // }

	backToHome(event) {
		event.preventDefault();
		// browserHistory.goBack();
    history.back()
	}

	render() {
    console.log('=====>', this.props);
		// let repo = this.props.repoDetails;    
		// repo.owner = repo.owner || {};
    const movie = this.props.movie;
		
		return (
			<div className="detail-page">
				<p>
					Movie title:
					<span className="repo-name">{movie.title}</span>
				</p>
				<p>
					<img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
				</p>				
				<p>
					Description: {movie.overview}
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
		repoDetails: state.repoDetails,
    movie: state.movieDetails
	};
}

export default connect(mapStateToProps, {repoLoader: repoDetails})(DetailPage);
