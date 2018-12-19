import React, { Component } from 'react';

import './Authentication.css';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

import UserProfile from '../UserProfile/UserProfile'


class Authentication extends Component {

  constructor(props){
    super(props)
    // The component's Local state.
    this.state = {
      isSignedIn: false // Local signed-in state.
    };
  }


  // Configure FirebaseUI.
  uiConfig = {
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

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
    );
  }
  
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
    
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div id= "login-form-container">
          <h1>stArtRef</h1>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
          <p>If its the first time, an account will be created for u</p>
          <hr/>
          <p>Dunno how to comply to GDPR so uhh.. if u make an account, u agree that u will not sue me.</p>
          <br/>
          <h1>( ˘ ³˘)❤</h1>

        </div>
      );
    }else{
      return (      
        <div>
          <UserProfile/>
        </div>
      );
    }
  }
}

export default Authentication;