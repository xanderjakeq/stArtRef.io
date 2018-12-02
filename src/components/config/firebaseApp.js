import firebase from 'firebase';

  // Initialize Firebase
var config = {
  apiKey: "AIzaSyAGIkRHXMQUv3ODM56v6WGGIlGrVW12QsE",
  authDomain: "strtrf.firebaseapp.com",
  databaseURL: "https://strtrf.firebaseio.com",
  projectId: "strtrf",
  storageBucket: "strtrf.appspot.com",
  messagingSenderId: "378642240752"
};

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp;