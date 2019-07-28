import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import firebase from 'firebase';
import styled from 'styled-components';
import { toJson } from "unsplash-js";

import Ref from '../Ref/Ref'
import Scribble from '../Scribble/Scribble'

import {RefSet as RefSetStyle} from "../StartRef/StartRef";

const RefSet = (props) => {

    const [user, setUser] = useState();
    const [username, setUserName] = useState('');
    const [active, setActive] = useState(false);
    const [upload, setUpload] = useState(null);

	const storageRef = firebase.storage().ref();

	useEffect(() => {
        setUser(firebase.auth().currentUser);
	},[])

    useEffect(()=>{
		setUpload(document.getElementById('real-file'));
    },[user]);

    return(
        <>
            <HiddenInput type = 'file' id = 'real-file' hidden = 'hidden' onChange = {handleFile}/>
            <div>
                <UploadBtn onClick = {handleClick}>Share Art</UploadBtn>
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
		upload.click();
	}

	// referenced https://firebase.google.com/docs/storage/web/upload-files
	function handleFile(e){
		const input = e.target;
		const file = input.files[0];
		if(file.name.includes('.png')){
			const uploadTask = storageRef.child(`audio/${file.name}`).put(file);
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
						console.log('File available at', downloadURL);
                        handleSubmit(downloadURL);
					});
				}
			)
		}else{
			console.log('select an mp3 file')
		}

		console.log(input.files)
	}

    async function handleSubmit(artUrl){
        let username = await firebase.database().ref().child('Users/' + user.uid).once('value').then((snap) => {return snap.val().username})
        let postKey = firebase.database().ref().child('UserGroupedPosts/' + user.uid).push({
            author: username,
            artLink: artUrl,
            refLinks: props.data
        }).key

        firebase.database().ref().child('Posts/').update({
            [postKey]: {
                author: username,
                artLink: artUrl,
                refLinks: props.data
            }
        })

        firebase.database().ref().child('UserGroupedRefs/' + user.uid + '/' + props.refKey).remove()
    }
}

export default RefSet;

const HiddenInput = styled.input`
    display: none;
`;

const UploadBtn = styled.button`
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
`;
