import config from '../config';

export const POSTS_INVALID = 'POSTS_INVALID';
export const POSTS_FETCHING = 'POSTS_FETCHING';
export const POSTS_FETCHED = 'POSTS_FETCHED';
export const POSTS_FETCH_FAILED = 'POSTS_FETCH_FAILED';

function fetchPosts() {
	return (dispatch) => {
		dispatch({ type: POSTS_FETCHING });

		return fetch(`${config.apiHost}/posts`)
			.then((response) => {
				return response.json();
			})
			.then(
				(result) => dispatch({ type: POSTS_FETCHED, result }),
				(error) => dispatch({ type: POSTS_FETCH_FAILED, error })
			);
	}
}

function shouldFetchPosts(state) {
	const posts = state.posts;

	if (!posts.list ||
		posts.readyState === POSTS_FETCH_FAILED ||
		posts.readyState === POSTS_INVALID) {
		return true;
	}

	return false;
}

export function fetchPostsIfNeeded() {
	return (dispatch, getState) => {
		if (shouldFetchPosts(getState())) {
			return dispatch(fetchPosts());
		}
	}
}
