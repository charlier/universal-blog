import React, { Component } from 'react'
import { Link } from 'react-router'

class ListPost extends Component {

  render () {
    return (
			<ul>
				{this.props.posts.map((post) => {
          return (
						<li key={post.id}>
							<Link to={`/post/${post.id}`}>{post.title}</Link>
						</li>
					)
				})}
			</ul>
		)
  }
}

ListPost.propTypes = {
	posts: React.PropTypes.array
};

export default ListPost
