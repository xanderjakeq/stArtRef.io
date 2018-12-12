import React, { Component } from 'react';
import {Link, Route,} from "react-router-dom";
import firebase from 'firebase';

import Ref from '../Ref/Ref'
import Scribble from '../Scribble/Scribble'

import './PostOverlay.css';


const Overlay = (props) => {

    let postData = {};
    firebase.database().ref().child('Posts/' + props.match.params.postID).once('value', snap => {
        console.log(snap.val())
        postData = snap.val()
        return postData =  snap.val()
    })

    // Put this on TOP of Everything and add an exit button
    console.log(postData)
    return (
        
        <div className = "overlayWrapper">

            <h1 className="close-thin" onClick = {() => props.history.goBack()}></h1>

            <div className = "imagesWrapper">
                <img src = {postData.artLink} />

                <div className="refSet">
                    <Ref photoInfo = {postData.refLinks[0]}/>
                    <Ref photoInfo = {postData.refLinks[2]}/>
                    <Scribble scribbleUrl = {postData.refLinks[1]}/>
                </div>
            </div>
        </div>
    );
}

export default Overlay;