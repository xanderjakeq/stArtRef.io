import React, { Component, useState, useEffect} from 'react';

import './Authentication.css';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

import UserProfile from '../UserProfile/UserProfile';

const Authentication = (props) => {
    
    const [isSignedIn, updateIsSignedIn] = useState(localStorage.getItem('userData')); 

    // Configure FirebaseUI.
    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'redirect',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
          // Avoid redirects after sign-in.
          signInSuccessWithAuthResult: () => false
        }
    };

    useEffect(()=>{
        const unregister = isUserAuthed();

        //cleanup
        return () => {
            unregister();
        }    
    },[]);

    return (
      <>
        {isSignedIn ? 
            <div>
              <UserProfile/>
            </div>
            :
            <div id= "login-form-container">
              <h1>stArtRef</h1>
              <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
              <p>If its the first time, an account will be created for u</p>
              <hr/>
              <p>Dunno how to comply to GDPR so uhh.. if u make an account, u agree that u will not sue me.</p>
              <br/>
              <h1>( ˘ ³˘)❤</h1>
            </div>
        }
      </>
    );

    // Listen to the Firebase Auth state and set the local state.
    function isUserAuthed() {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => {
                if(user){
                    console.log(user)
                    localStorage.setItem('userData', JSON.stringify(user));
                    updateIsSignedIn(true);
                } else {
                    localStorage.removeItem('userData');
                    updateIsSignedIn(false);
                }
            }
        );
        // Make sure we un-register Firebase observers when the component unmounts.
        return unregisterAuthObserver; 
    }
}

export default Authentication;
