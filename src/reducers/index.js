import {combineReducers} from 'redux';

import auth from './authReducer';
import posts from './postReducer';
import refs from './refsReducer';

export default combineReducers({
	auth,
	posts,
	refs
});