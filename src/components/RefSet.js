import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import firebase from 'firebase';
import styled, {css} from 'styled-components';
import { toJson } from "unsplash-js";
import {connect} from "react-redux";

import Ref from '../Ref/Ref'
import Scribble from '../Scribble/Scribble'

import {RefSet as RefSetStyle} from "../StartRef/StartRef";

const storage = firebase.storage().ref();
const database = firebase.database().ref();

const RefSet = (props) => {

    return(
        <>
            <HiddenInput type = 'file' id = {props.refKey} hidden = 'hidden' onChange = {handleFile}/>
            <div>
                <ShareBtn onClick = {handleClick}>Share Art</ShareBtn>
                <div className = "refSetWrapper">
                    <RefSetStyle>
                        <Ref photoInfo = {props.data[0]}/>
                        <Scribble scribbleUrl = {props.data[1]}/>
                        <Ref photoInfo = {props.data[2]}/>
                    </RefSetStyle>
                </div>
            </div>
        </>
    )

    function handleClick(e){
		document.getElementById(`${props.refKey}`).click();
	}

	// referenced https://firebase.google.com/docs/storage/web/upload-files
	function handleFile(e){
		const input = e.target;
		const file = input.files[0];
		if(file.name.includes('.png')){
			const uploadTask = storage.child(`art/${file.name}`).put(file);
			uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
				(snapshot) => {
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log('Upload is ' + progress + '% done');
					switch (snapshot.state) {
					case firebase.storage.TaskState.PAUSED: // or 'paused'
						console.log('Upload is paused');
						break;
					case firebase.storage.TaskState.RUNNING: // or 'running'
						console.log('Upload is running');
						break;
					default:
						console.log(snapshot)
					}
				}, (error) => {

				switch (error.code) {
					case 'storage/unauthorized':
					// User doesn't have permission to access the object
					break;

					case 'storage/canceled':
					// User canceled the upload
					break;
					case 'storage/unknown':
					// Unknown error occurred, inspect error.serverResponse
					break;
					default:
						console.log(error)
				}
				}, () => {
					uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        handleSubmit(downloadURL);
					});
					database.child('UserGroupedRefs/' + props.user.uid + '/' + props.refKey).remove();
				}
			)
		}else{
			console.log('select an mp3 file')
		}

		console.log(input.files)
	}

    function handleSubmit(artUrl){
        let postKey = database.child('UserGroupedPosts/' + props.user.uid).push({
            author: props.username,
            artLink: artUrl,
            refLinks: props.data
        }).key;

        database.child('Posts/').update({
            [postKey]: {
                author: props.username,
                artLink: artUrl,
                refLinks: props.data
            }
        });
    }
}

const mstp = state => {
	return {
		user: state.auth.user,
		username: state.auth.userData.username
	}
}

export default connect(mstp, {})(RefSet);

const HiddenInput = styled.input`
    display: none;
`;

export const ShareBtn= styled.button`
	outline: none;
	background: transparent;
	border: solid 1px #27a9e0;
	border-radius: 3px;
	color: #27a9e0;
	font-size: 16px;
	margin: 20px 20px 0;
	outline: none !important;
	padding: 10px 20px;
	:hover{
		cursor: pointer;
		background: #FDF9F0;
	}
	${props => props.flexEnd && css`
		width: fit-content;
        height: fit-content;
        align-self: flex-end;
	`}
	${props => props.fontSize && css`
		font-size: ${props.fontSize}
	`}
`;