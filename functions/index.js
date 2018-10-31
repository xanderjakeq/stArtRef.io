const functions = require('firebase-functions');
const express = require('express');
import Unsplash, {toJson} from 'unsplash-js';

const app = express();

app.get('/random-photos', (request, response) =>{

})


exports.app = functions.https.onRequest(app);
