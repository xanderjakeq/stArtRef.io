const functions = require('firebase-functions');
const express = require('express');
const Unsplash = require('unsplash-js').default;
//not needed

function getRandomPhotos(){
    unsplash.photos.getRandomPhoto({count:"3"})
      .then((response) => {
          return response.json();
      })
        .then(json => {
          return json;
      });
}


exports.getPhotos = functions.https.onRequest((req, res) => {
    const result = getRandomPhotos();
    console.log(result);
    res.status(200).json(result);
  });