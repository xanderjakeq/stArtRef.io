import React, { Component } from 'react';
import firebase from 'firebase';
import { Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {signout} from '../actions';

import firebaseApp from './config/firebaseApp'

let database = firebase.database().ref();


class Options extends Component {

    constructor(props){
        super(props)


        this.state = {
            user: firebase.auth().currentUser,
            username: '',
            website: '',
            
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }

    checkUsername = (usernameCandidate) =>{
        let username = usernameCandidate.toLowerCase()
        return database.child(`Usernames/`).orderByValue().equalTo(username)
    }

    handleInputChange(event) {
        const target = event.target;
        let value;
        
        if(target.name == 'username' && target.value.length <= 30){
                                // keep to lowercase and remove whitespace 
            value = target.value.toLowerCase().replace(/\s+/g, '');

            // check availability
            // TODO: make this to separate method?
            this.checkUsername(value).once('value', snap => { 
                if(snap.val()) {
                    this.setState({
                        isUsernameAvailable: false
                    })
                }else{
                    this.setState({
                        isUsernameAvailable: true
                    })
                }
            })
        }else if(target.name == 'username'){
            //username too long
            value = target.value.substring(0, 30);
        }
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

    handleSave(){

        if(this.state.isUsernameAvailable){
            database.child('Users/' + this.state.user.uid).update({ 
                username: this.state.username,
                website: this.state.website
            })

            database.child('Usernames/').update({
                 [this.state.user.uid]: this.state.username
            })
        }else{
            alert('somebody took it \n (｡•́︿•̀｡)')
        }
    }


    componentDidMount(){
        database.child('Users/' + this.state.user.uid).on('value', snap => {
            let val = snap.val();
            if(val !== null){
                this.setState({
                    username: val.username,
                    website: val.website
                });
            }
        });
    }

    render(){
            return(
                <div className = "optionsWrapper">
                  {/* <h5 onClick = {this.handleClick}>Form</h5> */}
                  <div className = "pseudoForm">
                    <div className = 'inputWrapper'>

                    <label className = "formItem" >username</label>
                    <input
                        name="username"
                        type="text"
                        value={this.state.username}
                        onChange={this.handleInputChange} 
                       
                        className = {`formItem ${this.state.isUsernameAvailable || this.state.isUsernameAvailable == null  ? 'available': 'notAvailable'}`}
                        />
                    
                    </div>
                    <div className = 'inputWrapper'>

                     <label className = 'formItem'>website</label>
                    <input
                        name="website"
                        type="text"
                        value = {this.state.website}
                        onChange={this.handleInputChange} 
                        className = 'formItem'
                        />
                    
                    </div>
                    
                    
                    {/* <div className = 'inputWrapper'> */}
                    <div className = 'formItem'>
                        <button id = "saveButton" type="button" onClick = {this.handleSave} >Save</button>
                    </div>
                    {/* </div> */}
                        
                    <Link to = '/profile' onClick={() => this.props.signout()}>Sign-out</Link>

                    <Link to = '/' className = "formItem" id = "deleteAccount">delete account</Link>
                </div>

                
                </div>
            )
    }
}

const mstp = state => {
    return {

    }
}


export default connect(mstp, {signout})(Options);