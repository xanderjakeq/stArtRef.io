import React, { Component } from 'react';
import firebase from 'firebase';
import {Redirect, Link, Route} from 'react-router-dom';

import './UserProfile.css';

import Post from '../Post/Post';
import OPtions from '../Options/Options';

import firebaseApp from '../config/firebaseApp'
import Options from '../Options/Options';
import UploadButton from '../UploadButton/UploadButton'

let database = firebase.database().ref();


class UserProfile extends Component {

    constructor(props){
        super(props)

        this.state = {
            user: firebase.auth().currentUser,
            // userData: {},
            // name: props.user.displayName,
            username:'',
            // photoURL: props.user.photoURL
            website: '',
        }
    }



    componentWillMount(){
        console.log(this.props)
        database.child('Users/' + this.state.user.uid).on('value', snap => {
            console.log(snap.val())
            let val = snap.val();
            if(val !== null){
                this.setState({
                    userData: val,
                    username: val.username,
                    website: val.website
                });
            }
        });
    }

    render(){
        return(
            <div className = "profileWrapper">
                {/* profile info */}
                
                <div className = "centerThisShit">
                <header className = "profileCard">
                    {/* div for prof pic */}
                    {/* || "https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/33893737_246394459255620_4084772605851074560_n.jpg?_nc_cat=105&_nc_ht=scontent-iad3-1.xx&oh=05f76fd64f65659096d09182adef55f9&oe=5C764E6B" */}
                    <div className = "profilePhoto">
                        <img src= {this.state.user.photoURL || this.props.user.photoURL } alt ="profile picture"/>
                    </div>

                    {/* div for name and stuff */}

                    <div className= "text-Info">
                        <h1>{this.state.username.length < 16 ? this.state.username : this.state.username.substring(0,13) + '...'}</h1>
                        <a href={this.state.website}>{this.state.website.substring(this.state.website.indexOf('.') + 1,this.state.website.indexOf('/',this.state.website.indexOf('//')+2))}</a>
                    </div>

                    {/* moved to Options.js */}
                    {/* <Link to = '/profile' onClick={() => firebase.auth().signOut()}>Sign-out</Link> */}
                    {/* <Options/> */}
                    <Link to = "/options" id = "options">️️️️<span role="button" className = "navIcons">⚙️</span></Link>
                </header>

                {/* <button id = "uploadButton" className = "generate-btn">
                    <Link to = "/upload"><span className = "uploadButtonIcons">🎨🖌️</span></Link>
                </button> */}
                <UploadButton content = "🎨🖌️" linkTo = "/upload"/>

                </div>

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




export default UserProfile;