import config from '../config'

export const POST_INVALID = 'POST_INVALID'
export const POST_FETCHING = 'POST_FETCHING'
export const POST_FETCHED = 'POST_FETCHED'
export const POST_FETCH_FAILED = 'POST_FETCH_FAILED'

function fetchPost (postId) {
  return (dispatch) => {
    dispatch({ type: POST_FETCHING, postId: postId })

    return fetch(config.apiHost + '/post/' + postId)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server')
        }
        return response.json()
      })
			.then(
				(result) => dispatch({ type: POST_FETCHED, postId: postId, result }),
				(error) => dispatch({ type: POST_FETCH_FAILED, postId: postId, error })
			)
  }
}

function shouldFetchPost (state, postId) {
  const post = state.post[postId]

  if (!post ||
		post.readyState === POST_FETCH_FAILED ||
		post.readyState === POST_INVALID) {
    return true
  }

  return false
}

export function fetchPostIfNeeded (postId) {
  return (dispatch, getState) => {
    if (shouldFetchPost(getState(), postId)) {
      return dispatch(fetchPost(postId))
    }
  }
}
