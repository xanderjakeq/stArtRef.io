const functions = require('firebase-functions');
const firebase = require('firebase-admin')
const express = require('express');


//not needed

const firebaseApp = firebase.initializeApp(
    functions.config().firebase
);


const app = express();
const database = firebase.database();


app.get('/', (request, response) => {
	res.json({message: "welcome to the startref api"})
})
app.get('/account', (request, response) => {
    console.log('account');
    response.sendFile( __dirname + '/views/userProfile.html');
})

app.use(function (req, res, next) {
    console.log('404');
    res.status(404).sendFile(__dirname + '/views/404.html');
  })

export default functions.https.onRequest(app);