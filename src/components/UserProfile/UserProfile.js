import React, { Component} from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import {Redirect, Link, Route, withRouter} from 'react-router-dom';

import './UserProfile.css';

import Post from '../Post/Post';
import OPtions from '../Options/Options';

import firebaseApp from '../config/firebaseApp'
import Options from '../Options/Options';
import UploadButton from '../UploadButton/UploadButton'

import PostOverlay from '../PostOverlay/PostOverlay'

let database = firebase.database().ref();

class UserProfile extends Component {

    constructor(props){
        super(props)

        this.state = {
            user: firebase.auth().currentUser,
            // userData: {},
            // name: props.user.displayName,
            username:'(ಠ.ಠ) loading...',
            // photoURL: props.user.photoURL
            website: '',


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
        console.log(this.match)
        if(!this.state.pageRefKey){
            firebase.database().ref().child('UserGroupedPosts/' + this.state.user.uid).orderByKey().limitToLast(1).on('value', async (childSnapshot, prevChildKey) => {
            
                console.log(childSnapshot.val())
                if(childSnapshot.val()){
    
                let postsObjToArray = Object.keys(childSnapshot.val()).map(function(key) {
                    return {refKey: key, data:childSnapshot.val()[key]};
                });
                // console.log(postsObjToArray.pop().refKey)
                //can't call setState if component didn't mount yet (shouldn't)
                this.setState({
                    pageRefKey: await postsObjToArray.pop().refKey
                }) 
                console.log(this.state.pageRefKey)
                this.loadMore()

            }
            })
        }

        database.child('Users/' + this.state.user.uid).on('value', snap => {
            console.log(snap.val())
            let val = snap.val();
            if(val !== null){
                this.setState({
                    userData: val,
                    username: val.username,
                    website: val.website
                });
            }
        });

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

        this.state.firebaseRef.child('UserGroupedPosts/' + this.state.user.uid).orderByKey().endAt(this.state.pageRefKey).limitToLast(this.state.perPage).on('value', (childSnapshot, prevChildKey) => {
            
            console.log(childSnapshot.val())

            let postsObjToArray = Object.keys(childSnapshot.val()).map(function(key) {
                let itemKey = key;
                return {refKey: key, data:childSnapshot.val()[key]};
            });

            postsObjToArray.reverse()
            
            console.log(this.state.pageRefKey)
            
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

        let postsArray = this.state.posts;
        let postRendered = [];
        if(postsArray != null){
            postRendered =   postsArray.map((post) => {
                console.log(post.refKey)
                return (
                    // TODO: move postWrapper CSS to explore.css
                    <div className = "postWrapper" key = {post.refKey}>
                     <Link to = {`${this.props.match.url}/${post.refKey}`}>
                        <Post post = {post} key = {post.refKey} onClick = {this.handlePostClick}/>
                     </Link>
                    </div>
                )
            });
        }

        const { match, location, history } = this.props

        console.log(match.url)
        return(
            <div className = "profileWrapper">
                {/* profile info */}
                
                <div className = "centerThisShit">
                <header className = "profileCard">
                    {/* div for prof pic */}
                    <div className = "profilePhoto">
                        <img src= {this.state.user.photoURL || this.props.user.photoURL } alt ="profile picture"/>
                    </div>

                    {/* div for name and stuff */}
                    <div className= "text-Info">
                        <h1>{this.state.username.length < 16 ? this.state.username : this.state.username.substring(0,13) + '...'}</h1>
                        <a href={this.state.website}>{this.state.website.substring(this.state.website.indexOf('.') + 1,this.state.website.indexOf('/',this.state.website.indexOf('//')+2))}</a>
                    </div>

                    {/* moved to Options.js */}
                    <Link to = {`/options`} id = "options">️️️️<span className = "navIcons">⚙️</span></Link>
                </header>

                <UploadButton content = "🎨🖌️" linkTo = "/upload"/>

                </div>

                <div className = "postsWrapper">
                    <div className = "grid">  
                    {/* Posts Here */}
                        {postRendered}
                    </div>
                    <Route path= {`${this.props.match.url}/:postID`} component = {PostOverlay}  />
                </div>

                {/* <Route path = {`${match.url}/options`} component = {Options}/> */}
            </div>
        )
    }


}

export default withRouter(UserProfile);