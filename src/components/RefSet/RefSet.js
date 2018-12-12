import React, { Component } from 'react';
import {Link} from "react-router-dom";
import firebase from 'firebase';

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

        this.handleInputNotEmpty = this.handleInputNotEmpty.bind(this)
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

    handleInputNotEmpty(){
        this.setState({
            active: !this.state.active
        })
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(this._reactInternalFiber.key)
        this.setState({
          [name]: value
        });
      }

    async handleSubmit(){
        let username = await firebase.database().ref().child('Users/' + this.state.user.uid).once('value').then((snap) => {return snap.val().username})
        let postKey = firebase.database().ref().child('UserGroupedPosts/' + this.state.user.uid).push({
            author: username,
            artLink: this.state.artLink,
            refLinks: this.props.data
        }).key

        firebase.database().ref().child('Posts/').update({
            [postKey]: {
                author: username,
                artLink: this.state.artLink,
                refLinks: this.props.data
            }
        })

        firebase.database().ref().child('UserGroupedRefs/' + this.state.user.uid + '/' + this.props.refKey).remove()
    }


    render(){
        console.log(this.props)
        return(
            <div>
                <div className = 'inputWrapper'>
                <label className = 'formItem'>art link</label>
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
                    
                    <div onClick = {this.handleInputNotEmpty} className = "uploadButtonWrapper">

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