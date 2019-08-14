const functions = require('firebase-functions');
const firebase = require('firebase-admin')
const express = require('express');

//not needed

const firebaseApp = firebase.initializeApp(
    functions.config().firebase
);


const app = express();
const database = firebase.database();


app.get('/*', (request, response) => {
    console.log('main');
    response.sendFile(__dirname + '/build/index.html');
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


exports.createUserAccount = functions.auth.user().onCreate(user => {
    const name = user.displayName;
    const uid = user.uid;
    const email = user.email;
    const username = email.substring(0,email.indexOf('@'));
    const photoUrl = user.photoURL || 'some default link';


    const newUserRef = database.ref().child(`Users/${uid}`);
    newUserRef.set({
        name: name,
        email: email,
        photoUrl: photoUrl,
        username: username,
        uid: uid,
        website:''
    });

    database.ref().child(`Usernames/`).update({
        [uid]:username
    })

    return
});