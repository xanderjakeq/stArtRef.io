import React, { Component } from 'react';
import {Link} from "react-router-dom";
import './Post.css';

const Post = (props) => {
    return(
        <div className = "postWrapper">

            {/* <Link to=  {`${match.path}/:postId`} /> */}

            <a href="#">
                <img className = "post" src="https://pbs.twimg.com/media/DsaSe2uW0AAR9DH.jpg" />
            </a>

            
        </div>
    )
}

export default Post;