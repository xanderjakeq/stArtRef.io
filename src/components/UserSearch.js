import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { Link, Route, withRouter} from 'react-router-dom';

import Post from './Post';
import PostOverlay from './PostOverlay'

import {PostsWrapper, Grid, Profile} from "./UserProfile";

let database = firebase.database().ref();

const UserSearch = (props) => {

    const [pageRefKey, setPageRefKey] = useState('');
    const [posts, setPosts] = useState([]);
    const [endReached, setEndReached] = useState(false);
    const [scrolling, setScrolling] = useState(false);

    const [userData, setUserData] = useState({});

    const [perPage] = useState(16);

    useEffect(() => {
        database.child('Users/').orderByChild('username').equalTo(props.match.params.id).on('value', snap => {
            if(snap.val()){
                let uid = Object.keys(snap.val())[0];
                let val = snap.val()[uid];

                setUserData({...val})
            }

        });
    },[])
    
    useEffect(() => {
        if(!pageRefKey && userData){
            database.child('UserGroupedPosts/' + userData.uid).orderByKey().limitToLast(1).on('value', (childSnapshot, prevChildKey) => {
            
                if(childSnapshot.val()){
                    let postsObjToArray = Object.keys(childSnapshot.val()).map(function(key) {
                        return {refKey: key, data:childSnapshot.val()[key]};
                    });

                    setPageRefKey(postsObjToArray.pop().refKey);
                    
                    loadMore();
                }
            })
        }

        window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		}
	},[userData]);

    useEffect(() => {
		if (scrolling) {
			loadPosts();
		}
	},[scrolling]);

    return Object.entries(userData).length !== 0? (
        <Profile>
            {/* profile info */}
            
            <div className = "center">
            <div className = "profileCard">
                {/* div for prof pic */}
                <div className = "profilePhoto">
                    <img src= {userData.photoUrl || 'https://lh3.googleusercontent.com/my2SoB-c_lzhfPnGDt7ynEOPPqmdb7yDN8HMmnMuRtzAeGgUkW-ixMaVp41emNQ8AKz087ZvYvz0Z8A5qLEQi8jijQPq9UC_UIIxr1TS3Qp8Cjvyz6--wtfkxpQA4tjxQG2EFk1Jmo7bsKK0EywgFhKjhRfE1OvW6Bx_dGsaTLQQqjTpNrLntHNRUWNZTxjc9P9751PeO0Bvy7yjM9aq7N0a_691qYnENoBvbsw8MgsyBHPCYroZ7jQbJdhQyCPz0nq8U45-fLLV4weViUVuHDF9AIu1XiG38hzG29uk3BN2ZNA4yyJ2JVD6WBc1qowG3X2Y-k6kV-fT9Mam4ebOA8gdoiRhtvDiA-4lmemAKyJIzPlIDepuavYcYW1K_NmbFV54GVbCXxkzj31w9bllTD2kVYR-6j5aoIVcf4d47UmAt7BHg6jfVdGPbhXdqIdvqc5Az1K8VmKh2dk9fCxnEu6RNTp80nGY5erNU8AsFzSm4lLULUQ25OlLdtOjMJ_rxKLOB_3p6r6e9wR8WCM0M4aTut2Bp8j7mSFQkM9FfYO6MthAkOqz44XsxoN-wqt335IRlzdHIyeSVeycWNNuCG4f-33m7Tm-kkW-qezKpmF9WnufJPXNQuEm_brMRG9-9P7BvhPzpDdqWBzxtaLZqYZT=s943-no' } alt ="profile"/>
                </div>

                {/* div for name and stuff */}
                <div className= "text-Info">
                    <h1>{userData.username.length < 16 ? userData.username : userData.username.substring(0,13) + '...'}</h1>
                    <a href={userData.website}>{userData.website.substring(userData.website.indexOf('.') + 1,userData.website.indexOf('/',userData.website.indexOf('//')+2))}</a>
                </div>

            </div>

            </div>

            <PostsWrapper>
                <Grid id = "grid">
                {/* Posts Here */}
                    {posts.map((post) => (
                        <Post   
                            url={`art/${post.refKey}`}
                            post={post}
                            key={post.refKey}
                        />
                    ))}
                </Grid>
                <Route path= {`${props.match.url}/:postID`} component = {PostOverlay}  />
            </PostsWrapper>
        </Profile>
    ) 
    : null;

    function loadMore () {
        setScrolling(true);
    }

    function loadPosts(){
        if(endReached){
            return
        }

        database.child('UserGroupedPosts/' + userData.uid).orderByKey().endAt(pageRefKey).limitToLast(perPage).on('value', (childSnapshot, prevChildKey) => {
            
            let postsObjToArray = Object.keys(childSnapshot.val()).map(function(key) {
                return {refKey: key, data:childSnapshot.val()[key]};
            });

            postsObjToArray.reverse();
            
			if (postsObjToArray.length < perPage) {
				setEndReached(true);
			}
			else {
				setPageRefKey(postsObjToArray.pop().refKey);
			}
			setPosts([...posts, ...postsObjToArray]);
			setScrolling(false);
        });
    }

    function handleScroll () {
        if (scrolling) {
            return;
        }
        var lastLi = document.querySelector('#grid > div:last-child');
        var lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
        var pageOffset = window.pageYOffset + window.innerHeight;
        var bottomOffset = 20;
        if (pageOffset > lastLiOffset - bottomOffset) {
            loadMore();
        }
    }
}


export default withRouter(UserSearch);