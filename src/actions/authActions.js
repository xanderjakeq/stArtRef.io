import {ERROR} from './index';

import firebase from '../components/config/firebaseApp';

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const SIGNOUT = "SIGNOUT";

export const savedata = data => {
	return {
		type: LOGIN_SUCCESS,
		payload: data
	}
}

export const signout = () => {
	firebase.auth().signOut();
	return {
		type: SIGNOUT
	}
}