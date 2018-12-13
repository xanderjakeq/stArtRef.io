import React, { } from 'react';
import './Post.css';

const Post = (props) => {
    return( 
        <img className = "post" src={props.post.data.artLink} onClick = {props.onClick(props.post)} alt = 'art'/>       
    )
}


export default Post;