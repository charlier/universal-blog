import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import './scss/Home.scss';
import * as PostsActions from '../actions/posts';
import ListPost from '../components/ListPost';

// @connect(state => { posts: state.posts })
class Home extends Component {

  static readyOnActions(dispatch) {
    return Promise.all([
      dispatch(PostsActions.fetchPostsIfNeeded())
    ]);
  }

  componentDidMount() {
    Home.readyOnActions(this.props.dispatch);
  }

  renderPosts() {
    const posts = this.props.posts;

    if (posts.readyState === PostsActions.POSTS_INVALID ||
      posts.readyState === PostsActions.POSTS_FETCHING) {
        return <p id="loading">Loading</p>;
      }

      if (posts.readyState === PostsActions.POSTS_FETCH_FAILED) {
        return <p>Failed to fetch posts</p>;
      }

      return <ListPost posts={posts.list} />;
    }

    render() {
      return (
        <div>
        <Helmet
        title='Charlie Rogers | Full-Stack Developer'
        meta={[
          {'name': 'keywords', 'content': 'charlie rogers, charles rogers, charles a rogers, charlie a rogers, charlesrogers, charlierogers'},
          {'name': 'description', 'content': 'Charlie Rogers is a Technical Lead and Full-Stack Developer. Providing quality user experience through responsive design.'}
        ]}
        />
        <h1>charlie.im</h1>
        <p>Hi! I&rsquo;m <strong>Charlie Rogers</strong>, a Full-Stack Developer with experience in creating some of the most loved websites in the <abbr title="United Kingdom">UK</abbr>.<br />
        I&rsquo;m currently helping fix <a href="http://www.bbc.co.uk/iplayer">BBC iPlayer</a>.</p>
        <p>To get in touch, send me an email or find me on <a href="https://www.linkedin.com/in/charliero" target="_blank">LinkedIn</a>, <a href="https://github.com/charlier" target="_blank">GitHub</a>, or <a href="https://twitter.com/charlierogers" target="_blank">Twitter</a>.</p>
        <hr />
        <h2>Recent Posts:</h2>
        {this.renderPosts()}
        </div>
      );
    }
  }

  function mapStateToProps(state) {
    return {
      posts: state.posts
    };
  }

  Home.propTypes = {
    dispatch: React.PropTypes.func,
    posts: React.PropTypes.object
  };

  export default connect(mapStateToProps)(Home);
