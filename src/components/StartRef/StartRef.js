import React, { Component } from 'react';
import { toJson } from "unsplash-js";


import logo from '../../logo.svg';
import '../../App.css';

import Ref from '../Ref/Ref';
import Scribble from '../Scribble/Scribble';

import seedJson from '../../seed';


//use for user management later.


const rootUrl = "https://strtrf-backend.herokuapp.com/";

class StartRef extends Component {
    constructor(props){
        super(props);    
    
        this.state = {
          unsplashPhotos: seedJson,
          scribble: seedJson[1].urls.small
        }
    
        this.handleGenerateClick = this.handleGenerateClick.bind(this);
        this.getScribble = this.getScribble.bind(this);
      }
    
      getScribble(){
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
    
      handleGenerateClick(){
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
    
      componentDidMount(){
        this.handleGenerateClick();
      }
    
      render() {
        return (
          <div className="App">
            <header className="App-header">
              {/* <img src={logo} className="App-logo" alt="logo" /> */}
              {/* <h1 className="App-title">stArtRef</h1> */}
              <p>
                Finish the Scribble <br/>
                Draw something new with 2-3 refs.
              </p>
            </header>
            <h3 className="App-intro">
            Just draw! (•̀o•́)ง
            </h3>
                
            <br/>
    
            <button onClick = {this.handleGenerateClick} className = "generate-btn">generate</button>
            <div className="ref-wrapper">
              <Ref photoInfo = {this.state.unsplashPhotos[0]}/>
              <Scribble scribbleUrl = {this.state.scribble}/>
              <Ref photoInfo = {this.state.unsplashPhotos[2]}/>
            </div>
    
            <h5>Photos are from <a href="https://unsplash.com/?utm_source=startref&utm_medium=referral">Unsplash</a></h5>
            <p>
              Share what you drew or see what others did. Tag your post with #startrefio on<br/>
              <a href= "https://www.instagram.com/explore/tags/startrefio/" target="_blank" rel="noopener noreferrer">
                <span role="img" aria-label="Link to community artwork">👉</span>
                Instagram
              </a>
            </p>
    
            <p>
              Contribute by submitting your own scribbles on <a href="https://startrefio.tumblr.com/submit" target="_blank" rel="noopener noreferrer">Tumblr</a>
            </p>
          </div>
        );
      }
}

export default StartRef;