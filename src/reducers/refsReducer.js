import * as actions from '../actions';

import seedJson from '../seed';
const initialState = {
	unsplashPhotos: seedJson,
	scribble: seedJson[1].urls.small,
	init: true
}

const branchTable = {
	[actions.GET_SCRIBBLE]: (state, action) => {return {...state, scribble: action.payload}},
	[actions.GET_UNSPLASH_PHOTOS]: (state, action) => {return {...state, unsplashPhotos: action.payload, init: false}}
}

export default (state = initialState, action) => {
	return action.type in branchTable ? branchTable[action.type](state, action) : state;
}