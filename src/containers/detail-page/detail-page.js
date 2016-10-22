import React from 'react';
import { connect } from 'react-redux';

export class DetailPage extends React.Component {

	static loadPageData() {
		return new Promise((resolve, reject) => {
			setTimeout(function() {
				resolve({
					detailMessage: 'So, how do you do?'
				});
			}, 400);
		});
	}

	render() {
		return (
			<div className="detail-page">
				<h2>{this.props.pageData.detailMessage}</h2>
				<p>
					<a href="/">Back to Home</a>
				</p>
			</div>
		);
	}

}

export default connect()(DetailPage);
