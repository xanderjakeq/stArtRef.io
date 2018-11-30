import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';

import '../UserProfile/UserProfile.css';
import './Explore.css';

import Post from '../Post/Post';
import ArtWithRef from '../ArtWithRef/ArtWithRef'

const Explore = (props) => {
    // console.log(props)
    return(
        <div className = "profileWrapper">
            <Link to={`${props.match.url}/PostID`}>TEST LINK</Link>
            <div className = "postsWrapper">
                <div className = "grid">
                    <Post matchUrl = {props.match.url} postId = 'postID'/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                </div>
                {console.log(props.match.path)}
                <Route path= "/explore/:id" component={ArtWithRef} />

            </div>
        </div>
    )
}

export default Explore;