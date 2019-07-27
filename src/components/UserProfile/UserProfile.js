import React, { Component} from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import {Link, Route, withRouter} from 'react-router-dom';

import {connect} from 'react-redux';

import styled from 'styled-components';

// import './UserProfile.css';

import Post from '../Post/Post';


import firebaseApp from '../config/firebaseApp'

import UploadButton from '../UploadButton/UploadButton'

import PostOverlay from '../PostOverlay/PostOverlay'

let database = firebase.database().ref();

class UserProfile extends Component {

    constructor(props){
        super(props)

        this.state = {
            activePost: '',
            pageRefKey: null,
            firebaseRef: firebase.database().ref(),
            posts:[],
            perPage: 16,
            endReached: false,
            scrolling: false
        }

        this.handlePostClick = this.handlePostClick.bind(this)
        this.loadPosts = this.loadPosts.bind(this)
    }

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
      }

    componentWillMount(){
        if(!this.state.pageRefKey){
            firebase.database().ref().child('UserGroupedPosts/' + this.props.user.uid).orderByKey().limitToLast(1).on('value', async (childSnapshot, prevChildKey) => {
            
                if(childSnapshot.val()){
    
                let postsObjToArray = Object.keys(childSnapshot.val()).map(function(key) {
                    return {refKey: key, data:childSnapshot.val()[key]};
                });
                // console.log(postsObjToArray.pop().refKey)
                //can't call setState if component didn't mount yet (shouldn't)
                this.setState({
                    pageRefKey: await postsObjToArray.pop().refKey
                }) 
                
                this.loadMore()

            }
            })
        }

        this.scrollListener = window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll)
    }

    handlePostClick(post){
        this.state.activePost = post

        // this.setState({
        //     activePost: post,
        // })
    }

    handleScroll = () => {
        const { scrolling, totalPages, page} = this.state
        if (scrolling) return
        if (totalPages <= page) return
        var lastLi = document.querySelector('div.grid > div:last-child')
        if(lastLi == null) return
        var lastLiOffset = lastLi.offsetTop + lastLi.clientHeight
        var pageOffset = window.pageYOffset + window.innerHeight
        var bottomOffset = 20
        if (pageOffset > lastLiOffset - bottomOffset) {
          this.loadMore()
        }
        
      }

      loadPosts(){
        //prevent fetching if endisReached
        if(this.state.endReached){return}

        this.state.firebaseRef.child('UserGroupedPosts/' + this.props.user.uid).orderByKey().endAt(this.state.pageRefKey).limitToLast(this.state.perPage).on('value', (childSnapshot, prevChildKey) => {

            
            let postsObjToArray = Object.keys(childSnapshot.val()).map(function(key) {
                return {refKey: key, data:childSnapshot.val()[key]};
            });

            postsObjToArray.reverse()
            
            this.setState({
                //prevent updating pageRefKey if the current number of items is less than perPage
                pageRefKey: postsObjToArray.length < this.state.perPage ? this.setState({endReached: true}) : postsObjToArray.pop().refKey, 
                // posts:[...this.state.posts, ...postsObjToArray.reverse()]
                posts:[...this.state.posts, ...postsObjToArray],
                scrolling: false
            })
        });
    }

    loadMore = () => {
        this.setState(prevState => ({
          page: prevState.page+1,
          scrolling: true,
        }), this.loadPosts)
      }

    render(){
        return(
            <Profile>
                {/* profile info */}
                
                <div className = "centerThisShit">
                <div className = "profileCard">
                    {/* div for prof pic */}
                    <div className = "profilePhoto">
                        <img src= {this.props.user.photoURL } alt ="profile"/>
                    </div>

                    {/* div for name and stuff */}
                    <div className= "text-Info">
                        <h1>{this.props.userData.username.length < 16 ? this.props.userData.username : this.props.userData.username.substring(0,13) + '...'}</h1>
                        <a href={this.props.userData.website}>{this.props.userData.website.substring(this.props.userData.website.indexOf('.') + 1,this.props.userData.website.indexOf('/',this.props.userData.website.indexOf('//')+2))}</a>
                    </div>

                    {/* moved to Options.js */}
                    <Link to = {'settings'} id = "options"><span className = "navIcons" role = "img" aria-label = "settings">⚙️</span></Link>
                </div>

                <UploadButton content = "🎨🖌️" linkTo = "/upload"/>

                </div>

                <div className = "postsWrapper">
                    <Grid>  
                    {/* Posts Here */}
                        {this.state.posts.map((post) => (
                            <Post   
                                url={`${this.props.match.url}/${post.refKey}`}
                                post={post}
                                key={post.refKey}
                                click={this.handlePostClick}
                            />
                        ))}
                    </Grid>
                    <Route path= {`${this.props.match.url}/:postID`} component = {PostOverlay}  />
                </div>

                {/* <Route path = {`${match.url}/options`} component = {Options}/> */}
            </Profile>
        )
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
