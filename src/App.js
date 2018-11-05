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
      photos: seedJson
    }

    this.handleGenerateClick = this.handleGenerateClick.bind(this);
  }

  handleGenerateClick(){
    // TODO: limit user to 5 generates. Force  them to get drawing!
    fetch("https://strtrf-backend.herokuapp.com/random-photos")
    .then(toJson)
      .then(json => {
        //change photos state to new photos
        //the json for unsplash getrandomphotos api with count parameter is an array
        this.setState({
          photos: json
        })
      });
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
        <div className="ref-wrapper">
          <Ref photoInfo = {this.state.photos[0]}/>
          <Ref photoInfo = {this.state.photos[1]}/>
          <Ref photoInfo = {this.state.photos[2]}/>
        </div>

        <h5>All photos are from <a href="https://unsplash.com/?utm_source=startref&utm_medium=referral">Unsplash</a></h5>
        <p>
          Share what you drew or see what others did. Tag your post with #startrefio <br/> 
          <a href= "https://www.instagram.com/explore/tags/startrefio/" target="_blank" rel="noopener noreferrer">
            <span role="img" aria-label="Link to community artwork">👉</span>
          </a>
        </p>

        <Footer className = "footer"/>
      </div>
    );
  }
}

export default App;
