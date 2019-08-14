const functions = require('firebase-functions');
const firebase = require('firebase-admin')
const express = require('express');

const api = require('./components/api');

//not needed

const firebaseApp = firebase.initializeApp(
    functions.config().firebase
);

const database = firebase.database();

exports.api = api;

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