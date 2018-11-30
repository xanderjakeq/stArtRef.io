import React, { Component } from 'react';

import './Authentication.css';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import {Route, Redirect} from "react-router-dom";

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
    signInFlow: 'popup',
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
          <h1>My App</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
    return (
      <div>
        {/* {this.props.history.push('/@${firebase.auth().currentUser.displayName}')} */}
        {/* <UserProfile displayName = {firebase.auth().currentUser.displayName} uid = {firebase.auth().currentUser.uid}/> */}
        {/* <Route path =  component = {UserProfile}></Route> */}
        <Redirect to = {firebase.auth().currentUser.displayName} />
        

      </div>
    );
  }
}

export default Authentication;