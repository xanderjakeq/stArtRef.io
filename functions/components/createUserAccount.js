const functions = require('firebase-functions');

const firebase = require('../config');

const database = firebase.database();

const createUser = (user) => {
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
}

module.exports = functions.auth.user().onCreate(createUser);