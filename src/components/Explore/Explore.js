import React, { Component, useState, useEffect } from 'react';
import {Route, Link} from 'react-router-dom';
import firebase from '../config/firebaseApp';

import {Grid} from '../UserProfile/UserProfile';

import Post from '../Post/Post';
import PostOverlay from '../PostOverlay/PostOverlay';

const database = firebase.database().ref();

const Explore = (props) => {

    const [pageRefKey, setPageRefKey] = useState('');
    const [posts, setPosts] = useState([]);
    const [endReached, setEndReached] = useState(false);
    const [scrolling, setScrolling] = useState(false);

    const [perPage] = useState(16);
    
    useEffect(() => {
        if(!pageRefKey){
            database.child('Posts').orderByKey().limitToLast(1).on('value', (childSnapshot, prevChildKey) => {
            
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
	},[]);

    useEffect(() => {
		if (scrolling) {
			loadPosts();
		}
	},[scrolling]);

    return(
        <div className = "profileWrapper">               
            <div className = "postsWrapper">
                
            <Route path= {`${props.match.url}/:postID`} component = {PostOverlay}  />

                <Grid id = "grid">
                    {posts.length === 0 ? 'loading' :  posts.map((post) => {
                        return (
                            <Post   
                                url={`${props.match.url}/${post.refKey}`}
                                post={post}
                                key={post.refKey}
                            />
                        )
                        })
                    }
                </Grid>
                
            </div>
        </div>
    )

    function loadMore () {
        setScrolling(true);
    }

    function loadPosts(){
        if(endReached){
            return
        }

        database.child('Posts').orderByKey().endAt(pageRefKey).limitToLast(perPage).on('value', (childSnapshot, prevChildKey) => {
            
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

export default Explore;
