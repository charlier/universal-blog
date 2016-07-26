import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import * as PostActions from '../actions/post';
import SinglePost from '../components/SinglePost';

// @connect(state => { post: state.post })
class Post extends Component {

	static readyOnActions(dispatch, params) {
		return Promise.all([
			dispatch(PostActions.fetchPostIfNeeded(params.id))
		]);
	}

	componentDidMount() {
		Post.readyOnActions(this.props.dispatch, this.props.params);
	}

	getPost() {
		return this.props.post[this.props.params.id];
	}

	renderPost() {
		const post = this.getPost();

		if (!post || post.readyState === PostActions.POST_FETCHING) {
			return <p id="loading">Loading...</p>;
		}

		if (post.readyState === PostActions.POST_FETCH_FAILED) {
			return <p>Failed to fetch post</p>;
		}

		return <SinglePost post={post.info} />;
	}

	render() {
		return (
			<div>
				<Helmet
          title={(this.getPost() && this.getPost().info) ? this.getPost().info.title : 'loading...'}
          meta={[
            {'name': 'description', 'content': 'charlies blog post description'}
          ]}
        />
				{this.renderPost()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		post: state.post
	};
}

Post.propTypes = {
	params: React.PropTypes.object,
  post: React.PropTypes.object,
	dispatch: React.PropTypes.func
};

export default connect(mapStateToProps)(Post);
