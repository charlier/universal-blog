import React, { Component } from 'react';
import Helmet from 'react-helmet';

class About extends Component {

	render() {
		return (
			<div>
				<Helmet title='About' />
				<h1>About</h1>
				<p>text here...</p>
			</div>
		);
	}
}

export default About;
