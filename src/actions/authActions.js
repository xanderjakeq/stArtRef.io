import {ERROR} from './index';

export const SAVING_DATA = "SAVING_DATA";

// Listen to the Firebase Auth state and set the local state.
export const savedata = data => {
	return {
		type: SAVING_DATA,
		payload: data
	}
}