import React from 'react';
import firebase from 'firebase';

import Ref from '../Ref/Ref'
import Scribble from '../Scribble/Scribble'

import './PostOverlay.css';


const Overlay = (props) => {

    let postData = {};
    firebase.database().ref().child('Posts/' + props.match.params.postID).once('value', snap => {
        postData = snap.val()
        return postData =  snap.val()
    })

    // Put this on TOP of Everything and add an exit button
    return (
        
        <div className = "overlayWrapper">

            <h1 className="close-thin" onClick = {() => props.history.goBack()}></h1>
            
            <div className = "imagesWrapper">
                
                <img src = {postData.artLink} onClick = {() => props.history.push(`/${postData.author}`)} alt = 'Art'/>

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