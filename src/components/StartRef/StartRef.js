import React, { Component } from 'react';
import { toJson } from "unsplash-js";
import styled from "styled-components";

import firebase from 'firebase';

import Ref from '../Ref/Ref';
import Scribble from '../Scribble/Scribble';

import seedJson from '../../seed';

const rootUrl = "https://strtrf-backend.herokuapp.com/";

class StartRef extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      username: '',
      unsplashPhotos: seedJson,
      scribble: seedJson[1].urls.small,
      userDBRef: firebase.database().ref()
    }

    this.handleGenerateClick = this.handleGenerateClick.bind(this);
    this.getScribble = this.getScribble.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }

  getScribble() {
    let local = "http://localhost:3001/scribbles";
    let production = "https://startref-backend.herokuapp.com/scribbles";
    fetch(production)
      .then(toJson)
      .then(json => {
        this.setState({
          scribble: json
        })
      });
  }

  handleGenerateClick() {
    // TODO: limit user to 5 generates. Force  them to get drawing!
    let local = "http://localhost:3001/random-photos";
    let production = "https://startref-backend.herokuapp.com/random-photos";
    this.getScribble();
    fetch(production)
      .then(toJson)
      .then(json => {
        //change photos state to new photos
        //the json for unsplash getrandomphotos api with count parameter is an array
        this.setState({
          unsplashPhotos: json,
        })
      });
  }


  handleSaveClick() {
    if (this.state.user != null) {
      let refLinks = [this.state.unsplashPhotos[0], this.state.scribble, this.state.unsplashPhotos[2]];
      this.state.userDBRef.child('UserGroupedRefs/' + this.state.user.uid).push(refLinks)
    } else {
      alert("Sign in to Save \n (｢･ω･)｢")
    }
  }

  // componentWillMount(){
  //   database.child('Users/' + this.state.user.uid).on('value', snap => {
  //     console.log(snap.val())
  //     let val = snap.val();
  //     if(val !== null){
  //         this.setState({
  //             userData: val,
  //             username: val.username,
  //             website: val.website
  //         });
  //     }
  //   });
  // }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.setState({
            user: user,
            username: this.state.userDBRef.child('Users/' + user.uid).once('value').then((snap) => { return snap.val().username })
          })
        }
      }
    )
    this.handleGenerateClick();
  }

  render() {
    return (
      <Main>
        <header className="App-header">
          <p>
            Finish the Scribble <br />
            Draw something new with 2-3 refs.
              </p>
        </header>
        <h3 className="App-intro">
          Just draw! (•̀o•́)ง
            </h3>

        <br />

        <button onClick={this.handleGenerateClick} className="generate-btn">generate</button>
        <div className="ref-wrapper">
          <Ref photoInfo={this.state.unsplashPhotos[0]} />
          <Scribble scribbleUrl={this.state.scribble} />
          <Ref photoInfo={this.state.unsplashPhotos[2]} />
        </div>

        <SaveButton onClick={this.handleSaveClick} />

        <h5>Photos are from <a href="https://unsplash.com/?utm_source=startref&utm_medium=referral">Unsplash</a></h5>
       
        <p>
          Contribute by submitting your own scribbles on <a href="https://startrefio.tumblr.com/submit" target="_blank" rel="noopener noreferrer">Tumblr</a>
        </p>
        <p>
          <a href='https://medium.com/thelostcreatives/startrefio-d1781777dbb1' target="_blank" rel="noopener noreferrer">Learn More</a>
        </p>
      </Main>
    );
  }
}

function SaveButton(props) {
  return (
    <button onClick={props.onClick} className="generate-btn">👌</button>
  )
}

export default StartRef;

const Main = styled.div`
  :root{
    --footer-height: 10%;
  }

  text-align: center;
  padding-bottom:  var(--footer-height);
  max-width: 100%;
  overflow: hidden;
  padding-top: 60px;


  .App-logo {
    /* animation: App-logo-spin infinite 20s linear; */
    margin: 10px;
    height: 80px;
  }

  .App-header {
    color: black;
    display: inline-block;
    width: 100%;
    height: content;
  }

  .App-title {
    font-size: 2em;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .App-intro {
    font-size: large;
  }

  .ref-wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .generate-btn {
    /* -moz-box-shadow: 0px 0px 0px 0px #3dc21b;
    -webkit-box-shadow: 0px 0px 0px 0px #3dc21b;
    box-shadow: 0px 0px 0px 0px #3dc21b; */
    background-color:#55e1d0;
    -moz-border-radius:42px;
    -webkit-border-radius:42px;
    border-radius:42px;
    display:inline-block;
    cursor:pointer;
    color:#000000;
    font-family:Verdana;
    font-size:14px;
    padding:7px 11px;
    text-decoration:none;
    border: none;

    height: 2.5em;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .generate-btn:hover {
    background-color:#106367;
    color: white;
  }
  .generate-btn:active {
    position:relative;
    top:1px;
  }
  .generate-btn:focus {
    outline:0;
  }

  .option-btn {
    /* -moz-box-shadow: 0px 0px 0px 0px #3dc21b;
    -webkit-box-shadow: 0px 0px 0px 0px #3dc21b;
    box-shadow: 0px 0px 0px 0px #3dc21b; */
    // background-color:#465362;
    -moz-border-radius:5px;
    -webkit-border-radius:5px;
    border-radius:5px;
    display:inline-block;
    cursor:pointer;
    color:white;
    font-family:Verdana;
    font-size:14px;
    padding:7px 11px;
    text-decoration:none;
    border: none;

    height: 2.5em;
    /* margin-bottom: 15px; */
    margin: 5px;
    margin-top: 0px;
  }
  .option-btn:hover {
    background-color:#011936;
  }
  .option-btn:active {
    position:relative;
    top:1px;
  }
  .option-btn:focus {
    outline:0;
  }

  li{
    list-style: none;
  }

  a{
    text-decoration: none;
    color: 	#2e73b8;
  }
  a:active{
    text-decoration: none;
    color: black;
  }

  .form-input{
    margin: 20px;
    width: 25%;
    height: 2em;
    border: none;
    border-radius: 5px;
    padding: 5px;
    background-color: #465362;
    color: #FAFAFA;
  }

  .option-btn-active{
    /* -moz-box-shadow: 0px 0px 0px 0px #3dc21b;
    -webkit-box-shadow: 0px 0px 0px 0px #3dc21b;
    box-shadow: 0px 0px 0px 0px #3dc21b; */
    background-color:#C2EABD;
    -moz-border-radius:5px;
    -webkit-border-radius:5px;
    border-radius:5px;
    display:inline-block;
    cursor:pointer;
    color:black;
    font-family:Verdana;
    font-size:14px;
    padding:7px 11px;
    text-decoration:none;
    border: none;

    height: 2.5em;
    /* margin-bottom: 15px; */
    margin: 5px;
    margin-top: 0px;
  }

  .option-btn-active:focus {
    outline:0;
  }

  @media only screen and (min-width: 600px) {
    padding-top: 80px;

    .ref-wrapper{
      flex-direction: row;
    }
  }
`;