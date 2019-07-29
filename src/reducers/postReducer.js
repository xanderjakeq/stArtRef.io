import * as actions from '../actions';

const initialState = {
	pageRefKey: '',
	userPosts: [],
	explorePosts: [],
	activePost: {}
}

const branchTable = {
	[actions.SET_ACTIVE_POST]: (state, action) => {return {...state, activePost: action.payload}},
	[actions.SET_PAGE_REF_KEY]: (state, action) => {return {...state, pageRefKey: action.payload}}
}

export default (state = initialState, action) => {
	return action.type in branchTable ? branchTable[action.type](state, action) : state;
}