import { toJson } from "unsplash-js";
import firebase from "../components/config/firebaseApp";

const database = firebase.database().ref();

export const GET_SCRIBBLE = "GET_SCRIBBLE";
export const GET_UNSPLASH_PHOTOS = "GET_UNSPLASH_PHOTOS";

export const SAVED_REFS = "SAVED_REFS";

export const getScribble = () => dispatch => {
	let local = "http://localhost:3001/scribbles";
	let production = "https://startref-backend.herokuapp.com/scribbles";
	fetch(production)
		.then(toJson)
		.then(json => {
		dispatch({
			type: GET_SCRIBBLE,
			payload: json
		})
	});
}

export const getUnsplashPhotos = () => dispatch => {
	// TODO: limit user to 5 generates. Force  them to get drawing!
	let local = "http://localhost:3001/random-photos";
	let production = "https://startref-backend.herokuapp.com/random-photos";
	fetch(production)
		.then(toJson)
		.then(json => {
		//change photos state to new photos
		//the json for unsplash getrandomphotos api with count parameter is an array
		dispatch({
			type: GET_UNSPLASH_PHOTOS,
			payload: json
		})
		});
}

export const saveRefs = (uid, refs) => dispatch => {
    if (uid != null) {
		console.log(refs)
    //   let refLinks = [this.state.unsplashPhotos[0], this.state.scribble, this.state.unsplashPhotos[2]];
	  database.child('UserGroupedRefs/' + uid).push(refs)
	  dispatch({
		  type: SAVED_REFS,
	  })
    } else {
      alert("Sign in to Save \n (｢･ω･)｢")
    }
  }