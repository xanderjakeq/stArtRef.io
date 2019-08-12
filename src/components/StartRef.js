import React, {useState, useEffect} from 'react';
import { connect } from "react-redux";
import styled from "styled-components";

import firebase from './config/firebaseApp';

import Ref from './Ref';
import Scribble from './Scribble';
import Button from "./minor/Button";

import seedJson from '../seed';
import {getUnsplashPhotos, getScribble, saveRefs} from '../actions';

const rootUrl = "https://strtrf-backend.herokuapp.com/";

const database = firebase.database().ref();

const StartRef = (props) => {

  useEffect(() => {
    if(props.isInit){
      props.getUnsplashPhotos();
      props.getScribble();
    }
  },[])

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
      
      <RefSet>
        <Ref photoInfo={props.unsplashPhotos[0]} />
        <Scribble scribbleUrl={props.scribble} />
        <Ref photoInfo={props.unsplashPhotos[2]} />
      </RefSet>

      <Button content = "generate" title = "generate" click={() => {
        props.getUnsplashPhotos();
        props.getScribble();
      }}/>

      <Button content = "👌" title = "save" click={() => {
        props.saveRefs(props.user.uid, [props.unsplashPhotos[0], props.scribble, props.unsplashPhotos[2]])
        props.history.push("/upload")
      }} />

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

const mstp = state => {
  return {
    user: state.auth.user,
    unsplashPhotos: state.refs.unsplashPhotos,
    scribble: state.refs.scribble,
    isInit: state.refs.init,
    user: state.auth.user
  }
}

export default connect(mstp, {getUnsplashPhotos, getScribble, saveRefs})(StartRef);

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
  }
`;

export const RefSet = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media only screen and (min-width: 1150px) {
    flex-direction: row;
  }
`;