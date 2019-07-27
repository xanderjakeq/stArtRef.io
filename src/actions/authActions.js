import {ERROR} from './index';

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

// Listen to the Firebase Auth state and set the local state.
export const savedata = data => {
	return {
		type: LOGIN_SUCCESS,
		payload: data
	}
}