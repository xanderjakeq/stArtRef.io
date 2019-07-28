export const SET_ACTIVE_POST = "SET_ACTIVE_POST";

export const setActivePost = (post) => {
	return {
		type: SET_ACTIVE_POST,
		payload: post
	}
}