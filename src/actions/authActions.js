import {ERROR} from './index';

import firebase from '../components/config/firebaseApp';

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const SIGNOUT = "SIGNOUT";

const database = firebase.database().ref();

export const savedata = user => dispatch => {
	database.child('Users/' + user.uid).on('value', snap => {
		let val = snap.val();
		if(val !== null){
			dispatch({
				type: LOGIN_SUCCESS,
				payload: {
					user,
					userData: val
				}
			});
		}
	});
}

export const signout = () => {
	firebase.auth().signOut();
	return {
		type: SIGNOUT
	}
}