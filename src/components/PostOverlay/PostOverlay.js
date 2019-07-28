import React, {useState, useEffect} from 'react';
import firebase from '../config/firebaseApp';
import {connect} from "react-redux";

import styled from "styled-components";

import Ref from '../Ref/Ref'
import Scribble from '../Scribble/Scribble'

// import './PostOverlay.css';

const Overlay = (props) => {

    const [post, setPost] = useState();

    useEffect(() => {
        if (Object.entries(props.post).length === 0 && props.post.constructor === Object) {
            firebase.database().ref().child('Posts/' + props.match.params.postID).once('value', snap => {
                setPost(snap.val())
            })
        }
        else {
            setPost(props.post)
        }
    },[])

    return post !== undefined ? (
        <OverlayWrapper>
            <ClosetBtn className="close-thin" onClick = {() => props.history.goBack()}/>
            <div className = "imagesWrapper">

                <img src = {post.artLink} onClick = {() => props.history.push(`/${post.author}`)} alt = 'Art'/>

                <div className="refSet">
                    <Ref photoInfo = {post.refLinks[0]}/>
                    <Ref photoInfo = {post.refLinks[2]}/>
                    <Scribble scribbleUrl = {post.refLinks[1]}/>
                </div>
            </div>
        </OverlayWrapper>
    ) 
    :
    null
}

const mstp = state => {
    return {
        post: state.posts.activePost
    }
}

export default connect(mstp,{})(Overlay);

const OverlayWrapper = styled.div`
    position: fixed; /* Sit on top of the page content */
    /* display: none; Hidden by default */
    width: 100vw; /* Full width (cover the whole page) */
    height: 100vh; /* Full height (cover the whole page) */
    top: 0; 
    left: 0;
    /* right: 0;  */
    bottom: 0;
    background-color:#55e1d0; /* Black background with opacity */
    z-index: 10; /* Specify a stack order in case you're using a different order for other elements */
    // cursor: pointer; /* Add a pointer on hover */
    // margin-left: -10px;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const ClosetBtn = styled.div`
    color: #777;
    font: 14px/100% arial, sans-serif;
    position: absolute;
    right: 5%;
    text-decoration: none;
    text-shadow: 0 1px 0 #fff;
    top: 5px;

    &:after {
        content: '✖'; /* UTF-8 symbol */
    }
`;