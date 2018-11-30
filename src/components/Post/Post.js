import React, { Component } from 'react';
import {Link} from "react-router-dom";
import './Post.css';

const Post = (props) => {
    // console.log(props)
    return(
        <div className = "postWrapper">

            {/* <Link to=  {`${match.path}/:postId`} /> */}
            <Link to={`${props.matchUrl}/postID`}>
                <img className = "post" src="https://pbs.twimg.com/media/DsaSe2uW0AAR9DH.jpg" />
            </Link>

            
        </div>
    )
}

export default Post;