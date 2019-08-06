import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import styled from 'styled-components';

import firebaseApp from '../config/firebaseApp';

import UploadButton from '../UploadButton/UploadButton';
import Post from '../Post/Post';
import PostOverlay from '../PostOverlay/PostOverlay';

let database = firebaseApp.database().ref();

const UserProfile = (props) => {

    const [pageRefKey, setPageRefKey] = useState('');
    const [posts, setPosts] = useState([]);
    const [endReached, setEndReached] = useState(false);
    const [scrolling, setScrolling] = useState(false);

    const [perPage] = useState(16);
    
    useEffect(() => {
        if(!pageRefKey){
            database.child('UserGroupedPosts/' + props.user.uid).orderByKey().limitToLast(1).on('value', (childSnapshot, prevChildKey) => {
            
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
        <Profile>
            {/* profile info */}
            
            <div className = "center">
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
            </PostsWrapper>
        </Profile>
    );

    function loadMore () {
        setScrolling(true);
    }

    function loadPosts(){
        if(endReached){
            return
        }

        database.child('UserGroupedPosts/' + props.user.uid).orderByKey().endAt(pageRefKey).limitToLast(perPage).on('value', (childSnapshot, prevChildKey) => {
            
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

const mstp = state => {
    return {
        user: state.auth.user,
        userData: state.auth.userData
    }
}

export default connect(mstp)(withRouter(UserProfile));

export {
    Profile, 
    Grid, 
    PostsWrapper
};

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

    .center{
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

    @media only screen and (min-width: 600px) {
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

        max-width: 306px;
        justify-content: flex-start; 
        margin-top: 2%;
        margin-bottom: 2%;

        @media only screen and (min-width: 350px) {
            max-width: 330px;
        }
        @media only screen and (min-width: 700px) {
            max-width: 660px;
        }
        @media only screen and (min-width: 1160px) {
            max-width: 1105px;
        }
`;

const PostsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
`; 