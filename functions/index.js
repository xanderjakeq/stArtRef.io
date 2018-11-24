const functions = require('firebase-functions');
const express = require('express');
const Unsplash = require('unsplash-js').default;
//not needed

const app = express();

app.get('/', (request, response) => {
    response.send("You can do this!");
})


exports.app = functions.https.onRequest(app);