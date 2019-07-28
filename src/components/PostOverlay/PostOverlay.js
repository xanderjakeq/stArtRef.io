import React, {useState, useEffect} from 'react';
import firebase from '../config/firebaseApp';
import {connect} from "react-redux";

import Ref from '../Ref/Ref'
import Scribble from '../Scribble/Scribble'

import './PostOverlay.css';

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
        <div className = "overlayWrapper">
            <h1 className="close-thin" onClick = {() => props.history.goBack()}></h1>
            <div className = "imagesWrapper">

                <img src = {post.artLink} onClick = {() => props.history.push(`/${post.author}`)} alt = 'Art'/>

                <div className="refSet">
                    <Ref photoInfo = {post.refLinks[0]}/>
                    <Ref photoInfo = {post.refLinks[2]}/>
                    <Scribble scribbleUrl = {post.refLinks[1]}/>
                </div>
            </div>
        </div>
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