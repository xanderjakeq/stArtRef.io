import React, { Component } from 'react';
import firebase from 'firebase';
import {Redirect, Link} from 'react-router-dom';

import './UserProfile.css';

import Post from '../Post/Post';

import firebaseApp from '../config/firebaseApp'

let database = firebase.database().ref();


class UserProfile extends Component {

    constructor(props){
        super(props)

        this.state = {
            user: firebase.auth().currentUser,
            userData: {},
            name: props.user.displayName,
            username:'',
            photoURL: props.user.photoURL
        }
    }


    componentDidMount(){
        database.child('Users/' + this.state.user.uid).once('value').then( snap => {
            console.log(snap.val())
            let val = snap.val();
            this.setState({
                userData: val,
                username: val.username
                // username: snap.val().username
            });
        });
    }

    render(){
        return(
            <div className = "profileWrapper">
                {/* profile info */}
                
                <header className = "profileCard">
                    {/* div for prof pic */}
                    {/* || "https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/33893737_246394459255620_4084772605851074560_n.jpg?_nc_cat=105&_nc_ht=scontent-iad3-1.xx&oh=05f76fd64f65659096d09182adef55f9&oe=5C764E6B" */}
                    <div className = "profilePhoto">
                        <img src= {this.state.photoURL || this.props.user.photoURL } alt ="profile picture"/>
                    </div>

                    {/* div for name and stuff */}

                    <div className= "text-Info">
                        <h1>{this.state.userData.username}</h1>
                        <h4>{this.state.userData.name}</h4>
                        <a href="link to IG">some links</a>
                    </div>
                    <Link to = '/profile' onClick={() => firebase.auth().signOut()}>Sign-out</Link>
                    {/* {renderRedirect(loggedIn)} */}
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
}


function renderRedirect(loggedIn){
    if (!loggedIn) {
      return <Redirect to='/login' />
    }
  }



export default UserProfile;