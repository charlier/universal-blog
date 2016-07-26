import React, { Component } from 'react';

class SinglePost extends Component {

  render() {
    const post = this.props.post;

    return (
      <div>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      </div>
    );
  }
}

SinglePost.propTypes = {
  post: React.PropTypes.object
};

export default SinglePost;
