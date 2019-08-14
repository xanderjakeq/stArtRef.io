const functions = require('firebase-functions');
const firebase = require('firebase-admin');

module.exports = firebase.initializeApp(
    functions.config().firebase
);