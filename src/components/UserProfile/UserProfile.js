import React, { Component } from 'react';

import './UserProfile.css';

import Post from '../Post/Post';

const UserProfile = (props) => {
    return(
        <div className = "profileWrapper">
            {/* profile info */}
            <header className = "profileCard">
                {/* div for prof pic */}
                <div className = "profilePhoto">
                    <img src="https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/33893737_246394459255620_4084772605851074560_n.jpg?_nc_cat=105&_nc_ht=scontent-iad3-1.xx&oh=05f76fd64f65659096d09182adef55f9&oe=5C764E6B" alt ="profile picture"/>
                </div>

                {/* div for name and stuff */}
                <div className= "text-Info">
                    <h1>{props.match.params.id}</h1>
                    <h4>Name</h4>
                    <a href="link to IG">some links</a>
                </div>
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

export default UserProfile;