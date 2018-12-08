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

    handleSubmit(){
        console.log(firebase.database().ref().child('Users/' + this.state.user.uid).username)
        firebase.database().ref().child('UserGroupedPosts/' + this.state.user.uid).push({
            author: firebase.database().ref().child('Users/' + this.state.user.uid).once('value').then((snap) => {return snap.val().username}),
            artLink: this.state.artLink,
            refLinks: this.props.data
        })
    }


    render(){
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
                        <Scribble scribbleUrl = {this.props.data[1]}/>
                        <Ref photoInfo = {this.props.data[2]}/>
                    </div>

                    
                    <div onClick = {this.handleInputNotEmpty} className = "uploadButtonWrapper">

                    {this.state.artLink != '' &&
                    <button onClick = {this.handleSubmit} id = "submit" className = "generate-btn">
                        <Link to = "/explore"><span className = "uploadButtonIcons">📤</span></Link>
                    </button>
                    }
                    </div>
                </div>    
            </div>

            </div>
        )
      }
}

export default RefSet;