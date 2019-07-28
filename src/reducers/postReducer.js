import * as actions from '../actions';

const initialState = {
	userPosts: [],
	explorePosts: [],
	activePost: {}
}

const branchTable = {
	[actions.SET_ACTIVE_POST]: (state, action) => {return {...state, activePost: action.payload}}
}

export default (state = initialState, action) => {
	return action.type in branchTable ? branchTable[action.type](state, action) : state;
}