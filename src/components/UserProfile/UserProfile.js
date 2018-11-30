import React, { Component } from 'react';
import firebase from 'firebase';
import {Redirect} from 'react-router-dom';

import './UserProfile.css';

import Post from '../Post/Post';

// let config = {
//     apiKey: "AIzaSyAGIkRHXMQUv3ODM56v6WGGIlGrVW12QsE",
//     authDomain: "strtrf.firebaseapp.com",
//     databaseURL: "https://strtrf.firebaseio.com",
//     projectId: "strtrf",
//     storageBucket: "strtrf.appspot.com",
//     messagingSenderId: "378642240752"
// }


// firebase.initializeApp(config);

const UserProfile = (props) => {

    let loggedIn = true;

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            console.log('logged in')
        }else{
            console.log('signed out')
            loggedIn = false;
        }
    })
    return(
        <div className = "profileWrapper">
            {/* profile info */}
            <header className = "profileCard">
                {/* div for prof pic */}
                <div className = "profilePhoto">
                    <img src="https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/33893737_246394459255620_4084772605851074560_n.jpg?_nc_cat=105&_nc_ht=scontent-iad3-1.xx&oh=05f76fd64f65659096d09182adef55f9&oe=5C764E6B" alt ="profile picture"/>
                </div>

                {/* div for name and stuff */}
                {console.log(props)}
                <div className= "text-Info">
                    <h1>{props.match.params.id}</h1>
                    <h4>{props.uid}</h4>
                    <a href="link to IG">some links</a>
                </div>
                <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
                {renderRedirect(loggedIn)}
            </header>

            <div className = "postsWrapper">
                <div className = "grid">
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    
                </div>
            </div>
        </div>
    )
}


function renderRedirect(){
    if (!loggedIn) {
      return <Redirect to='/login' />
    }
  }



export default UserProfile;