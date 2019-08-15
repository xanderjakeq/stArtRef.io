const functions = require('firebase-functions');
const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const url = require('url');
const patreon = require('patreon');

const firebase = require('../config');
const env = require('../env');

const patreonAPI = patreon.patreon
const patreonOAuth = patreon.oauth


const app = express();
const database = firebase.database();

// const redirect_uri = "https://us-central1-strtrf.cloudfunctions.net/api/patreon/validate";
const redirect_uri = "http://localhost:5000/strtrf/us-central1/api/patreon/validate";

app.get('/', (req, res) => {
	res.json({message: "welcome to the startref api"})
})
app.get('/patreon', (req, res) => {
	res.redirect('https://www.patreon.com/oauth2/authorize?' +
    querystring.stringify({
      response_type: 'code',
    //   client_id: functions.config().patreon.id || process.env.patreon_id,
      client_id: env.patreon.id,
      redirect_uri
	}))
})

app.get('/patreon/validate', (req, res) => {
	let code = req.query.code || null
	let options = {
		headers: {
			'Content-Type' : 'application/x-www-form-urlencoded'
		}
	}
	axios.post('https://www.patreon.com/api/oauth2/token?' +
	querystring.stringify({
		code: code,
		redirect_uri,
		grant_type: "authorization_code",
		// client_id: functions.config().patreon.id || process.env.patreon_id,
		// client_secret: functions.config().patreon.id || process.env.patreon_secret
		client_id: env.patreon.id,
		client_secret: env.patreon.secret
	}), options)
	.then(patreon_res => {
		var access_token = patreon_res.data.access_token;
		// let uri = functions.config().patreon.frontend_uri || 'http://localhost:3000';
		let uri = env.patreon.frontend_uri || 'http://localhost:3000';
		res.redirect(uri + '?access_token=' + access_token);
	}).catch(err => {
		console.log(err);
	})
	
})

module.exports = functions.https.onRequest(app);