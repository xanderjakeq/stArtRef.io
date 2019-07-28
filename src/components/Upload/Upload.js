import React, {useState, useEffect} from 'react';
import firebase from 'firebase';
import {withRouter, Redirect} from 'react-router-dom';
    
import {connect} from "react-redux";

import './Upload.css';

import RefSet from '../RefSet/RefSet';

let database = firebase.database().ref();

const Upload = (props) => {

    const [savedRefs, updateSavedRefs] = useState([]);

    useEffect(()=> {
        initialize();
    },[]);

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

        database.child('UserGroupedRefs/' + props.user.uid).on('value', snap => {
            if(snap.val() != null){
                let refsObjToArray = Object.keys(snap.val()).map(function(key) {
                    return {refKey: key, data:snap.val()[key]};
                });

                updateSavedRefs(refsObjToArray);
            }
        });
    }
}

const mstp = state => {
    return {
        user: state.auth.user,
    }
}

export default connect(mstp)(withRouter(Upload));