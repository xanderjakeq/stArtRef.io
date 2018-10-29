import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import * as firebase from 'firebase';
import unsplash from 'unsplash-js';

const config = {
    apiKey: "AIzaSyAGIkRHXMQUv3ODM56v6WGGIlGrVW12QsE",
    authDomain: "strtrf.firebaseapp.com",
    databaseURL: "https://strtrf.firebaseio.com",
    projectId: "strtrf",
    storageBucket: "strtrf.appspot.com",
    messagingSenderId: "378642240752"
};
 


firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
