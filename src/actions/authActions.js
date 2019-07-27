import {ERROR} from './index';

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const savedata = data => {
	return {
		type: LOGIN_SUCCESS,
		payload: data
	}
}