const functions = require('firebase-functions');
const express = require('express');
import Unsplash, {toJson} from 'unsplash-js';

const unsplash = new Unsplash({
    applicationId: "2ad52822b76c86f81277427123910eb1eafbe981acd64ef570481310aa46b024",
    secret: "5bdbad8893f8f07c3eb393dc2d4ef73894caf6494a4da5ab65214f04b37c34ec",
    callbackUrl: "urn:ietf:wg:oauth:2.0:oob",
});


function getRandomPhotos(){
    unsplash.photos.getRandomPhoto({count:"3"})
      .then(toJson)
        .then(json => {
          //change photos state to new photos
          return json;
      });
}

const app = express();

app.get('/random-photos', (request, response) =>{
    response.json(getRandomPhotos());
})


exports.app = functions.https.onRequest(app);
