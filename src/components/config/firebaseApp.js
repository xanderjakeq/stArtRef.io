import firebase from 'firebase';
import config from './config';

// Initialize Firebase 
// replace with your own config
// var config = config;

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp;