import React, { Component } from 'react';
import {Link} from "react-router-dom";
import firebase from 'firebase';
import { toJson } from "unsplash-js";

import './RefSet.css';

import UploadButton from '../UploadButton/UploadButton';
import Ref from '../Ref/Ref'
import Scribble from '../Scribble/Scribble'

class RefSet extends Component {
    constructor(props){
        super(props)

        this.state = {
            user: firebase.auth().currentUser,
            username: '',
            artLink: '',
            active: false
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // componentDidMount(){
    //     firebase.auth().onAuthStateChanged(
    //       (user) => {
    //         if(user){
    //           this.setState({
    //             user: user,
    //             username: this.state.userDBRef.child('Users/' + user.uid).once('value').then((snap) => {return snap.val().username})
    //           })
    //         }
    //       }
    //     )
    //   }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
      }

    async handleSubmit(){

        if(this.state.artLink.indexOf('https://www.instagram.com/p/') === -1){
            console.log(this.state.artLink)
            alert("pls make sure its from instagram \n (灬♥ω♥灬)")
            return
        }else{

            let artLink = this.state.artLink.substring(0, this.state.artLink.indexOf('?') !== -1 ? this.state.artLink.indexOf('?'): this.state.artLink.lastIndexOf('/'))

            console.log(artLink)

            await fetch(artLink + '?__a=1')
            .then(toJson)
              .then(json => {
                // let imgLink =  
                artLink = json.graphql.shortcode_media.display_url 
                //.substring(0, imgLink.indexOf('?') !== -1 ? imgLink.indexOf('?'): imgLink.length)
              });
            
            console.log(artLink)

            let username = await firebase.database().ref().child('Users/' + this.state.user.uid).once('value').then((snap) => {return snap.val().username})
            let postKey = firebase.database().ref().child('UserGroupedPosts/' + this.state.user.uid).push({
                author: username,
                artLink: artLink,
                refLinks: this.props.data
            }).key

            firebase.database().ref().child('Posts/').update({
                [postKey]: {
                    author: username,
                    artLink: artLink,
                    refLinks: this.props.data
                }
            })

            firebase.database().ref().child('UserGroupedRefs/' + this.state.user.uid + '/' + this.props.refKey).remove()
        }
    }


    render(){
        return(
            <div>
                <div className = 'inputWrapper'>
                <label className = 'formItem'>Instagram share link</label>
                <input
                    name="artLink"
                    type="text"
                    value={this.state.artLink}
                    onChange={this.handleInputChange} 
                    className = 'formItem'
                    />
                </div>
            <div className = "refSetWrapper">
                <div>
                    
                    <div className="refSet">
                        <Ref photoInfo = {this.props.data[0]}/>
                        <Ref photoInfo = {this.props.data[2]}/>
                        <Scribble scribbleUrl = {this.props.data[1]}/>
                    </div>
                    
                    <div  className = "uploadButtonWrapper">

                    {this.state.artLink != '' &&
                    <Link to = "/explore">
                        <button onClick = {this.handleSubmit} id = "submit" className = "generate-btn">
                            <span className = "uploadButtonIcons">📤</span>
                        </button>
                    </Link>
                    }
                    </div>
                </div>    
            </div>

            </div>
        )
      }
}

export default RefSet;