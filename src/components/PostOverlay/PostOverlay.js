import React from 'react';
import {connect} from "react-redux";

import Ref from '../Ref/Ref';
import Scribble from '../Scribble/Scribble';

import './PostOverlay.css';

const Overlay = (props) => {
    return (
        <div className = "overlayWrapper">
            <h1 className="close-thin" onClick = {() => props.history.goBack()}></h1>
            <div className = "imagesWrapper">
                <img src = {props.post.artLink} onClick = {() => props.history.push(`/${props.post.author}`)} alt = 'Art'/>

                <div className="refSet">
                    <Ref photoInfo = {props.post.refLinks[0]}/>
                    <Ref photoInfo = {props.post.refLinks[2]}/>
                    <Scribble scribbleUrl = {props.post.refLinks[1]}/>
                </div>
            </div>
        </div>
    ) 
}

const mstp = state => {
    return {
        post: state.posts.activePost
    }
}

export default connect(mstp,{})(Overlay);