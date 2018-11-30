const functions = require('firebase-functions');
const firebase = require('firebase-admin')
const express = require('express');
const Unsplash = require('unsplash-js').default;
const engines = require('consolidate');


//not needed

const firebaseApp = firebase.initializeApp(
    functions.config().firebase
);


const app = express();
const database = firebase.database();


app.get('/', (request, response) => {
    console.log('main');
    response.sendFile(__dirname + '/views/index.html');
})
app.get('/account', (request, response) => {
    console.log('account');
    response.sendFile( __dirname + '/views/userProfile.html');
})

app.use(function (req, res, next) {
    console.log('404');
    res.status(404).sendFile(__dirname + '/views/404.html');
  })

exports.app = functions.https.onRequest(app);


exports.createUserAccount = functions.auth.user().onCreate(event => {
    const uid = event.data.uid;
    const email = event.data.email;
    const name = event.data.displayName || email.substring(0,email.indexOf('@'));
    const photoUrl = event.data.photoURL || 'some default link';


    const newUserRef = database.ref().child(`/users/${uid}`);
    return newUserRef.set({
        email: email,
        photoUrl: photoUrl,
        name: name,
        uid: uid,
        isSupervisor: false,
        totalHours: 0,
        hours: {uid:0}
    });

});