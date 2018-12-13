import React, { Component} from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { Link, Route, withRouter} from 'react-router-dom';

import '../UserProfile/UserProfile.css';

import Post from '../Post/Post';

import PostOverlay from '../PostOverlay/PostOverlay'

let database = firebase.database().ref();

class UserProfile extends Component {

    constructor(props){
        super(props)

        this.state = {
            userData: {},
            // userData: {},
            // name: props.user.displayName,
            username: this.props.match.params.id,
            // photoURL: props.user.photoURL
            website: '',
            userUid: '',


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
        database.child('Users/').orderByChild('username').equalTo(this.props.match.params.id).on('value', snap => {
             let uid = Object.keys(snap.val())[0];
            let val = snap.val()[uid];
            if(val !== null){
                this.setState({
                    userData: val,
                    username: val.username,
                    website: val.website,
                    userUid: uid
                });
            }
        });

        this.scrollListener = window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll)
    }

    componentDidMount(){
        if(!this.state.pageRefKey ){
            
            firebase.database().ref().child('UserGroupedPosts/' + this.state.userUid).orderByKey().limitToLast(1).on('value', async (childSnapshot, prevChildKey) => {
            
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

        if(this.state.userUid != null){

        this.state.firebaseRef.child('UserGroupedPosts/' + this.state.userUid).orderByKey().endAt(this.state.pageRefKey).limitToLast(this.state.perPage).on('value', (childSnapshot, prevChildKey) => {
            
            let dataArray = childSnapshot.val()
            // [this.state.userUid]
            // if(dataArray != null){
                let postsObjToArray = Object.keys(dataArray).map(function(key) {
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
            // }
        });
        }
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

        return(
            <div className = "profileWrapper">
                {/* profile info */}
                
                <div className = "centerThisShit">
                <header className = "profileCard">
                    {/* div for prof pic */}
                    <div className = "profilePhoto">
                        <img src= {this.state.userData.photoUrl || 'https://lh3.googleusercontent.com/my2SoB-c_lzhfPnGDt7ynEOPPqmdb7yDN8HMmnMuRtzAeGgUkW-ixMaVp41emNQ8AKz087ZvYvz0Z8A5qLEQi8jijQPq9UC_UIIxr1TS3Qp8Cjvyz6--wtfkxpQA4tjxQG2EFk1Jmo7bsKK0EywgFhKjhRfE1OvW6Bx_dGsaTLQQqjTpNrLntHNRUWNZTxjc9P9751PeO0Bvy7yjM9aq7N0a_691qYnENoBvbsw8MgsyBHPCYroZ7jQbJdhQyCPz0nq8U45-fLLV4weViUVuHDF9AIu1XiG38hzG29uk3BN2ZNA4yyJ2JVD6WBc1qowG3X2Y-k6kV-fT9Mam4ebOA8gdoiRhtvDiA-4lmemAKyJIzPlIDepuavYcYW1K_NmbFV54GVbCXxkzj31w9bllTD2kVYR-6j5aoIVcf4d47UmAt7BHg6jfVdGPbhXdqIdvqc5Az1K8VmKh2dk9fCxnEu6RNTp80nGY5erNU8AsFzSm4lLULUQ25OlLdtOjMJ_rxKLOB_3p6r6e9wR8WCM0M4aTut2Bp8j7mSFQkM9FfYO6MthAkOqz44XsxoN-wqt335IRlzdHIyeSVeycWNNuCG4f-33m7Tm-kkW-qezKpmF9WnufJPXNQuEm_brMRG9-9P7BvhPzpDdqWBzxtaLZqYZT=s943-no' } alt ="profile"/>
                    </div>

                    {/* div for name and stuff */}
                    <div className= "text-Info">
                        <h1>{this.state.username.length < 16 ? this.state.username : this.state.username.substring(0,13) + '...'}</h1>
                        <a href={this.state.website}>{this.state.website.substring(this.state.website.indexOf('.') + 1,this.state.website.indexOf('/',this.state.website.indexOf('//')+2))}</a>
                    </div>

                    {/* moved to Options.js */}
                    {/* <Link to = {`/options`} id = "options">️️️️<span className = "navIcons">⚙️</span></Link> */}
                </header>

                {/* <UploadButton content = "🎨🖌️" linkTo = "/upload"/> */}

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