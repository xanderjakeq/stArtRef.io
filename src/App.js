import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Ref from './components/Ref/Ref';
import Footer from './components/Footer/Footer';
import SearchForm from './components/SearchForm/SearchForm';
import OptionButton from './components/OptionButton/OptionButton';

import seedJson from './seed';

//use for user management later.
import * as firebase from 'firebase';

import Unsplash, {toJson} from 'unsplash-js';

const unsplash = new Unsplash({
  applicationId: "2ad52822b76c86f81277427123910eb1eafbe981acd64ef570481310aa46b024",
  secret: "5bdbad8893f8f07c3eb393dc2d4ef73894caf6494a4da5ab65214f04b37c34ec",
  callbackUrl: "urn:ietf:wg:oauth:2.0:oob",
});

var defaultPhotos;

let initJson;
    unsplash.search.photos("portraits", 7, 30)
    .then(toJson)
      .then(json => {

        defaultPhotos = json;
        
    });

class App extends Component {

  constructor(props){
    super(props);    

    this.state = {
      photos: seedJson
    }

    this.handleGenerateClick = this.handleGenerateClick.bind(this);
  }


  handleGenerateClick(){
    const total = this.state.clicks; 
    unsplash.photos.getRandomPhoto({count:"3"})
      .then(toJson)
        .then(json => {
          // Your code
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
        <p>Share what you drew or see what others did. Tag your post with #startrefio <br/> <a href= "https://www.instagram.com/explore/tags/startrefio/" target="blank" >👉</a></p>

        <Footer className = "footer"/>
      </div>
    );
  }
}

export default App;
