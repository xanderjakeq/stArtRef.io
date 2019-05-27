import React, {useState, useEffect} from 'react';
import firebase from 'firebase';
import {withRouter, Redirect} from 'react-router-dom';

import './Upload.css';

import RefSet from '../RefSet/RefSet'

let database = firebase.database().ref();

const Upload = (props) => {

    const [user, updateUser] = useState();
    const [userData, updateUserData] = useState({});
    const [username, updateUsername] = useState('');
    const [savedRefs, updateSavedRefs] = useState([]);
    const [refKeys, updateRefKeys] = useState([]);

    useEffect(()=>{
        updateUser(firebase.auth().currentUser);
    },[]);

    useEffect(()=> {
        initialize();
    },[user]);

    
      
    return(
        <div className = "profileWrapper">
            <div className = "postsWrapper">
                {savedRefs != null ? savedRefs.map((ref) => <RefSet data = {ref.data} key = {ref.refKey} refKey = {ref.refKey}/>) : 
                    <h1>save refs to post</h1>
                }
            </div>
        </div>
    );

    function initialize() {
        if(!user){
            return 
        }
        database.child('Users/' + user.uid).on('value', snap => {
            let val = snap.val();
            if(val !== null){
                updateUserData(val);
            }
        });

        database.child('UserGroupedRefs/' + user.uid).on('value', snap => {
            if(snap.val() != null){
                let refsObjToArray = Object.keys(snap.val()).map(function(key) {
                    return {refKey: key, data:snap.val()[key]};
                });

                updateSavedRefs(refsObjToArray);
            }
        });
    }
}

export default withRouter(Upload);
