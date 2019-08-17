import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import styled from "styled-components";

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

import {savedata} from '../actions';

import UserProfile from './UserProfile';

const Authentication = (props) => {

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
        {props.isAuthed ? 
            <div>
              <UserProfile/>
            </div>
            :
            <LoginContainer>
              <h1>stArtRef is invite only (for now)</h1>
              <p>join <a href = "https://discord.gg/492Nqfg">discord</a> for details.</p>
              {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
              <p>If its the first time, an account will be created for u</p>
              <hr/>
              <p>Dunno how to comply to GDPR so uhh.. if u make an account, u agree that u will not sue me.</p>
              <br/>
              <h1>( ˘ ³˘)❤</h1> */}
            </LoginContainer>
        }
      </>
    );

    // Listen to the Firebase Auth state and set the local state.
    function isUserAuthed() {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => {
                if(user){
                    props.savedata(user)
                } 
            }
        );
        // Make sure we un-register Firebase observers when the component unmounts.
        return unregisterAuthObserver; 
    }
}

const mstp = state => {
  return {
    isAuthed: state.auth.isAuthed
  }
}

export default connect(mstp, {savedata})(Authentication);

const LoginContainer = styled.div`
  padding-top: 30vh;
  text-align: center;
`;