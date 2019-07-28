import {combineReducers} from 'redux';

import auth from './authReducer';
import posts from './postReducer';

export default combineReducers({
	auth,
	posts
});