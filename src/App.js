import React, { Component } from 'react';
import { toJson } from "unsplash-js";

import logo from './logo.svg';
import './App.css';

import Ref from './components/Ref/Ref';
import Footer from './components/Footer/Footer';

import seedJson from './seed';

//use for user management later.
import * as firebase from 'firebase';

class App extends Component {

  constructor(props){
    super(props);    

    this.state = {
      unsplashPhotos: seedJson,
      scribble: '' 
    }

    this.handleGenerateClick = this.handleGenerateClick.bind(this);
    this.getScribble = this.getScribble.bind(this);
  }

  getScribble(){
    let local = "http://localhost:3001/scribbles";
    fetch(local)
    .then(toJson)
      .then(json => {
        console.log(json);
      });
  }

  handleGenerateClick(){
    // TODO: limit user to 5 generates. Force  them to get drawing!
    let local = "http://localhost:3001/random-photos";
    let production = "https://strtrf-backend.herokuapp.com/random-photos";
    this.getScribble();
    fetch(local)
    .then(toJson)
      .then(json => {
        //change photos state to new photos
        //the json for unsplash getrandomphotos api with count parameter is an array
        this.setState({
          unsplashPhotos: json,
        })
      });
  }

  componentDidMount(){
    this.handleGenerateClick();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">stArtref</h1>
          <p>draw something new inspired by 2-3 refs</p>
        </header>
        <h3 className="App-intro">
        Just draw! (•̀o•́)ง
        </h3>
            
        <br/>

        <button onClick = {this.handleGenerateClick} className = "generate-btn">generate</button>
        <div className="scribbles">
          {/* <Ref photoInfo = {}/> */}
        </div>
        <div className="ref-wrapper">
          <Ref photoInfo = {this.state.unsplashPhotos[0]}/>
          <Ref photoInfo = {this.state.unsplashPhotos[1]}/>
          <Ref photoInfo = {this.state.unsplashPhotos[2]}/>
        </div>

        <h5>All photos are from <a href="https://unsplash.com/?utm_source=startref&utm_medium=referral">Unsplash</a></h5>
        <p>
          Share what you drew or see what others did. Tag your post with #startrefio on<br/> 
          <a href= "https://www.instagram.com/explore/tags/startrefio/" target="_blank" rel="noopener noreferrer">
            <span role="img" aria-label="Link to community artwork">👉 Instagram</span>
          </a>
        </p>

        <Footer className = "footer"/>
      </div>
    );
  }
}

export default App;
