import * as actions from '../actions';

const initialState = {
	authenticating: false,
	user: {},
	userData: {
		username: '(ಠ.ಠ) loading...',
		website: ''
	},
	userMusicTaste: null,
	isAuthed:  false, 
	error: null
}

const branchTable = {
	[actions.LOGIN_SUCCESS]: (state, action) => {return {...state, user: action.payload.user, userData: action.payload.userData, isAuthed: true}},
	[actions.SIGNOUT]: (state, action) => {return {...initialState}}
}

export default (state = initialState, action) => {
	return action.type in branchTable ? branchTable[action.type](state, action) : state;
}