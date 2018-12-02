import React, { Component } from 'react';

import './Authentication.css';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import {Route, Redirect} from "react-router-dom";

import UserProfile from '../UserProfile/UserProfile'

import firebaseApp from '../config/firebaseApp'

class Authentication extends Component {

  constructor(props){
    super(props)
    // The component's Local state.
    this.state = {
      user: {},
      username: '',
      userDbData: {},
      isSignedIn: false // Local signed-in state.
    };

    this.authListener = this.authListener.bind(this)

  }


  async authListener(){
    await firebaseApp.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({
          user: user,
          uid: user.uid,
          userDbData: firebase.database().ref().child(`Users${user.uid}`).once('value').then( snap => {
            return snap.val()
          })
        });
      }else{
        this.setState({user: {}});
      }
    });
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

    this.authListener();
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
          <p>If its the first time, one will be created for u</p>
        </div>
      );
    }else{
      console.log(this.state.user)



    return (

      
      <div>
        {/* {this.props.history.push('/@${firebase.auth().currentUser.displayName}')} */}
        {/* <UserProfile displayName = {firebase.auth().currentUser.displayName} uid = {firebase.auth().currentUser.uid}/> */}
        {/* <Route path =  component = {UserProfile}></Route> */}
        {/* <Redirect to = {this.state.user.uid} /> */}
        <UserProfile user = {this.state.user} uid = {this.state.uid}/>
      </div>
    );
    }
  }
}

export default Authentication;