export const SET_ACTIVE_POST = "SET_ACTIVE_POST";
export const LOAD_POSTS = "LOAD_POSTS";
export const SET_PAGE_REF_KEY = "SET_PAGE_REF_KEY";

export const setActivePost = (post) => {
	return {
		type: SET_ACTIVE_POST,
		payload: post
	}
}

export const setPageRefKey = (key) => {
	return {
		type: SET_PAGE_REF_KEY,
		payload: key
	}
}