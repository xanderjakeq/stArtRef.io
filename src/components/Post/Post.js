import React, { Component } from 'react';
import {Link, Route} from "react-router-dom";
import './Post.css';

const Post = (props) => {
    return( 
        <img className = "post" src={props.post.data.artLink} onClick = {props.onClick(props.post)}/>       
    )
}


export default Post;