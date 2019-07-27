import * as actions from '../actions';

const initialState = {
	authenticating: false,
	userData: {},
	userMusicTaste: null,
	isAuthed:  false, 
	error: null
}

const branchTable = {
	[actions.LOGIN_SUCCESS]: (state, action) => {return {...state, userData: action.payload, isAuthed: true}},
	[actions.SIGNOUT]: (state, action) => {return {...state, isAuthed: false}}
}

export default (state = initialState, action) => {
	return action.type in branchTable ? branchTable[action.type](state, action) : state;
}