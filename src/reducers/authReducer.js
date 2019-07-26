
const initialState = {
	authenticating: false,
	userData: {},
	userMusicTaste: null,
	isAuthed:  false, 
	error: null
}

const AUTH_START = "AUTH_START";

const branchTable = {
	[AUTH_START]: (state) => {return {...state, authenticating: true, error: null}}
}

export default (state = initialState, action) => {
	return branchTable[action.type](state)
}