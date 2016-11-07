import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { getTrendingRepos } from '../../api/github';
import { getTopRated } from '../../api/tmdb';
import { searchRepos, loadTopRated } from '../../actions/';
import ReposList from '../../components/repos-list';
import MovieSummary from '../../components/movie-summary';

import './home-page.css';

export class HomePage extends React.Component {

	static navigationAction(requestContext) {
    
    // getTopRated()
    //   .then(data => {
    //     console.info('Top rated movies:', data);
    //   })
    //   .catch(err => {
    //     console.error('Top rated movies error:', err);
    //   });
    
		// return searchRepos(requestContext.queryStringParams.q);
    return loadTopRated();
	}

	constructor(props) {
		super(props);
		this.searchRepos = this.searchRepos.bind(this);
	}

  // componentDidMount() {
  //   this.props.searchRepos();
  // }

	searchRepos(event) {
    event.preventDefault();
    console.log(Object.keys(browserHistory));
    this.props.searchRepos(this.searchInput.value);
    browserHistory.push(`/?q=${this.searchInput.value}`);
	}

	render() {
    const movies = this.props.movies.map((movie, index) => {
      return (<MovieSummary movie={movie} key={index} />);
    });
    console.info('Rendering home page...');
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
				<ul className="repos-list">{movies}</ul>
			</div>
		);
	}

}

HomePage.propTypes = {
	repos: React.PropTypes.array.isRequired
};

function mapStateToProps(state) {
	return { 
		repos: state.repos,
    movies: state.moviesList
	};
}

export default connect(mapStateToProps, { searchRepos })(HomePage);
