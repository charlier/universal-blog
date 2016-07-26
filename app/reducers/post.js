import {
	POST_INVALID,
	POST_FETCHING,
	POST_FETCHED,
	POST_FETCH_FAILED
} from '../actions/post';

export default function post(state = { readyState: POST_INVALID }, action) {
	switch (action.type) {
		case POST_FETCHING:
			return Object.assign({}, state, {
				[action.postId]: {
					readyState: POST_FETCHING
				}
			});
		case POST_FETCH_FAILED:
			return Object.assign({}, state, {
				[action.postId]: {
					readyState: POST_FETCH_FAILED,
					error: action.error
				}
			});
		case POST_FETCHED:
			return Object.assign({}, state, {
				[action.postId]: {
					readyState: POST_FETCHED,
					info: action.result
				}
			});
		default:
			return state;
	}
}
