import React, { Component, useState, useEffect} from 'react';
import firebase from 'firebase';
import { Link} from 'react-router-dom';
import {connect} from 'react-redux';
import styled from "styled-components";

import {signout} from '../actions';

import firebaseApp from './config/firebaseApp'

let database = firebase.database().ref();

const Options = (props) => {
    
    const [user] = useState(firebase.auth().currentUser);
    const [username, setUserName] = useState('');
    const [website, setWebsite] = useState('');
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);

    useEffect(() => {
        if (!user) return
        database.child('Users/' + user.uid).on('value', snap => {
            let val = snap.val();
            if(val !== null){
                setUserName(val.username);
                setWebsite(val.website);
            }
        });
    },[user])

    return(
        <OptionsWrapper>
            <Form>
            <InputWrapper>

            <label className = "formItem" >username</label>
            <input
                name="username"
                type="text"
                value={username}
                onChange={handleInputChange} 
                
                className = {`formItem ${isUsernameAvailable || isUsernameAvailable == null  ? 'available': 'notAvailable'}`}
                />
            
            </InputWrapper>
            <InputWrapper>

                <label className = 'formItem'>website</label>
            <input
                name="website"
                type="text"
                value = {website}
                onChange={handleInputChange} 
                className = 'formItem'
                />
            </InputWrapper>
            
            {/* <div className = 'inputWrapper'> */}
            <div className = 'formItem'>
                <button id = "saveButton" type="button" onClick = {handleSave} >Save</button>
            </div>
            {/* </div> */}
                
            <Link to = '/profile' onClick={() => this.props.signout()}>Sign-out</Link>

            <Link to = '/' className = "formItem" id = "deleteAccount">delete account</Link>
        </Form>
        
        </OptionsWrapper>
    )

    function checkUsername(usernameCandidate){
        let username = usernameCandidate.toLowerCase()
        return database.child(`Usernames/`).orderByValue().equalTo(username)
    }

    function handleInputChange(event) {
        const target = event.target;
        let value;
        
        if(target.name == 'username' && target.value.length <= 30){
                                // keep to lowercase and remove whitespace 
            value = target.value.toLowerCase().replace(/\s+/g, '');

            // check availability
            // TODO: make this to separate method?
            checkUsername(value).once('value', snap => { 
                if(snap.val()) {
                    this.setState({
                        isUsernameAvailable: false
                    })
                }else{
                    this.setState({
                        isUsernameAvailable: true
                    })
                }
            })
        }else if(target.name == 'username'){
            //username too long
            value = target.value.substring(0, 30);
        }
        const name = target.name;
        
        if (name === "username"){
            setUserName(value);
        }
        else {
            setWebsite(value);
        }
      }

    function handleSave(){

        if(isUsernameAvailable){
            database.child('Users/' + user.uid).update({ 
                username: username,
                website: website
            })

            database.child('Usernames/').update({
                 [user.uid]: username
            })
        }else{
            alert('somebody took it \n (｡•́︿•̀｡)')
        }
    }
}

const mstp = state => {
    return {
        user: state.auth.user
    }
}


export default connect(mstp, {signout})(Options);

const OptionsWrapper = styled.div`
    padding-top: 100px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;