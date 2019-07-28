import React, { Component, useState, useEffect } from 'react';
import {Route, Link} from 'react-router-dom';
import firebase from '../config/firebaseApp';

import {Grid} from '../UserProfile/UserProfile';

import Post from '../Post/Post';
import PostOverlay from '../PostOverlay/PostOverlay';

const Explore = (props) => {

    const [pageRefKey, updatePageRefKey] = useState('');
    const [page, updatePage] = useState(0);
    const [posts, updatePosts] = useState([]);
    const [isEndReached, updateIsEndReached] = useState(false);
    const [isScrolling, updateIsScrolling] = useState(false);

    const [perPage, updatePerPage] = useState(16);
    const firebaseRef = firebase.database().ref();

    useEffect(() => {

        if(!pageRefKey){
            firebaseRef.child('Posts').orderByKey().limitToLast(1).on('value', (childSnapshot, prevChildKey) => {
                if(childSnapshot.val()){
                    let postsObjToArray = Object.keys(childSnapshot.val());

                    updatePageRefKey(postsObjToArray[0]);
                }
            })
        }

        loadMore();

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }

    },[pageRefKey])

    return(
        <div className = "profileWrapper">               
            <div className = "postsWrapper">
                
            <Route path= {`${props.match.url}/:postID`} component = {PostOverlay}  />

                <Grid>
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

    function loadMore (){
        updatePage(page => page + 1);
        updateIsScrolling(true);
        loadPosts();
    }

    function loadPosts(){
        //prevent fetching if endisReached
        if(isEndReached ){return}

        firebaseRef.child('Posts').orderByKey().endAt(pageRefKey).limitToLast(perPage).on('value', (childSnapshot, prevChildKey) => {
            
            if(childSnapshot.val()){

                let postsObjToArray = Object.keys(childSnapshot.val()).map(function(key) {
                    let itemKey = key;
                    return {refKey: key, data:childSnapshot.val()[key]};
                });

                postsObjToArray.reverse();
                    
                updatePageRefKey(postsObjToArray.length < perPage ? updateIsEndReached(true) : postsObjToArray.pop().refKey);
                updatePosts([...posts, ...postsObjToArray]);
                updateIsScrolling(false);
                
            }
        });
    }

    function handleScroll() {
        if (isScrolling) return
        // if (totalPages <= page) return
        var lastLi = document.querySelector('div.grid > div:last-child');
        if(lastLi == null) return;
        var lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
        var pageOffset = window.pageYOffset + window.innerHeight;
        var bottomOffset = 20;
        if (pageOffset > lastLiOffset - bottomOffset) {
            loadMore();
        }
        
    }
}

export default Explore;
