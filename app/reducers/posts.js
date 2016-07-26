import {
	POSTS_INVALID,
	POSTS_FETCHING,
	POSTS_FETCHED,
	POSTS_FETCH_FAILED
} from '../actions/posts';

export default function posts(state = {
	readyState: POSTS_INVALID,
	list: null
}, action) {
	switch (action.type) {
		case POSTS_FETCHING:
			return Object.assign({}, state, {
				readyState: POSTS_FETCHING
			});
		case POSTS_FETCH_FAILED:
			return Object.assign({}, state, {
				readyState: POSTS_FETCH_FAILED,
				error: action.error
			});
		case POSTS_FETCHED:
			return Object.assign({}, state, {
				readyState: POSTS_FETCHED,
				list: action.result
			});
		default:
			return state;
	}
}
