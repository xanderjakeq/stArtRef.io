import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import styled from 'styled-components';

import firebaseApp from '../config/firebaseApp'

import UploadButton from '../UploadButton/UploadButton'
import Post from '../Post/Post';
import PostOverlay from '../PostOverlay/PostOverlay'

let database = firebaseApp.database().ref();

const UserProfile = (props) => {

    const [activePost, updateActivePost] = useState('');
    const [pageRefKey, updatePageRefKey] = useState('');
    const [page, updatePage] = useState(0);
    const [posts, updatePosts] = useState([]);
    const [isEndReached, updateIsEndReached] = useState(false);
    const [isScrolling, updateIsScrolling] = useState(false);

    const [perPage, updatePerPage] = useState(16);
    
    useEffect(() => {

        if(!pageRefKey){
            database.child('UserGroupedPosts/' + props.user.uid).orderByKey().limitToLast(1).on('value', (childSnapshot, prevChildKey) => {
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
        <Profile>
            {/* profile info */}
            
            <div className = "centerThisShit">
            <div className = "profileCard">
                {/* div for prof pic */}
                <div className = "profilePhoto">
                    <img src= {props.user.photoURL } alt ="profile"/>
                </div>

                {/* div for name and stuff */}
                <div className= "text-Info">
                    <h1>{props.userData.username.length < 16 ? props.userData.username : props.userData.username.substring(0,13) + '...'}</h1>
                    <a href={props.userData.website}>{props.userData.website.substring(props.userData.website.indexOf('.') + 1,props.userData.website.indexOf('/',props.userData.website.indexOf('//')+2))}</a>
                </div>

                {/* moved to Options.js */}
                <Link to = {'settings'} id = "options"><span className = "navIcons" role = "img" aria-label = "settings">⚙️</span></Link>
            </div>

            <UploadButton content = "🎨🖌️" linkTo = "/upload"/>

            </div>

            <div className = "postsWrapper">
                <Grid>  
                {/* Posts Here */}
                    {posts.map((post) => (
                        <Post   
                            url={`${props.match.url}/${post.refKey}`}
                            post={post}
                            key={post.refKey}
                            click={handlePostClick}
                        />
                    ))}
                </Grid>
                <Route path= {`${props.match.url}/:postID`} component = {PostOverlay}  />
            </div>

            {/* <Route path = {`${match.url}/options`} component = {Options}/> */}
        </Profile>
    )

    function handlePostClick(post){
        updateActivePost(post);
    }

    function loadMore (){
        updatePage(page => page + 1);
        updateIsScrolling(true);
        loadPosts();
    }

    function loadPosts(){
        //prevent fetching if endisReached
        if(isEndReached ){return}

        database.child('UserGroupedPosts/' + props.user.uid).orderByKey().endAt(pageRefKey).limitToLast(perPage).on('value', (childSnapshot, prevChildKey) => {
            
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

const mstp = state => {
    return {
        user: state.auth.user,
        userData: state.auth.userData
    }
}

export default connect(mstp)(withRouter(UserProfile));

export {Grid};

const Profile = styled.div`
    padding-top: 60px;

    a {
        text-decoration: none;
    }

    .profileCard{
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 16px;
        /* margin-right: 16px; */
        margin-top: 30px;
        margin-bottom: 24px;
        width: -webkit-fill-available;
    }

    .profilePhoto{
        margin-right: 28px;
        flex-shrink: 0;
    }

    .centerThisShit{
        display:flex;
        flex-direction: column;
        justify-content:center;
        align-items:center;
    }

    .profilePhoto img{
        border-radius: 50%;
        height: 77px;
        width: 77px;
    }

    .text-Info{
        flex-basis: 0;
        flex-grow: 1;
        overflow: hidden;
    }

    .text-Info h1{
        font-size: 22px;
        line-height: 26px;
        font-weight: 700;
    }

    .text-Info h4{
        font-size: 14px;
        line-height: 20px;
    }

    .text-Info *{
        margin-top: 0;
        margin-bottom: 0;
    }

    .postsWrapper{
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
    }

    .postWrapper{
        width: 33%;
        /* margin: 1px; */
        margin: 
        // margin-left: 0.3%;
        // margin-bottom: 0.3%;
    }

    #uploadButton{
        width: fit-content;
        height: fit-content;
        align-self: flex-end;
    }

    .uploadButtonIcons{
        font-size: 20px;
    }


    @media only screen and (min-width: 600px) {
        .profileWrapper{
            padding-top: 80px;
        }

        .profileCard{
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-left: 16px;
            margin-right: 16px;
            margin-top: 30px;
            margin-bottom: 44px;
            
        }
        
        .profilePhoto{
            margin-right: 28px;
            flex-shrink: 0;
        }
        
        .profilePhoto img{
            border-radius: 50%;
            height: 77px;
            width: 77px;
        }
        
        .text-Info{
            flex-basis: 0;
            flex-grow: 1;
        }
        
        .text-Info h2{
            font-size: 22px;
            line-height: 26px;
        }
        
        .text-Info h4{
            font-size: 14px;
            line-height: 20px;
        }
        
        .text-Info *{
            margin-top: 0;
            margin-bottom: 0;
        }
    }
`;

const Grid = styled.div`
        display: flex;
        flex-wrap: wrap;

        /* row-reverse to keep posts in order till I fix the data fetch */
        flex-direction: row-reverse;

        width: 100%;
        /* flex-end to start from left */
        justify-content: flex-end; 
        margin-top: 2%;
        margin-bottom: 2%;
`;
