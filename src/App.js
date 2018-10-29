import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Ref from './components/Ref/Ref';
import Footer from './components/Footer/Footer';
import SearchForm from './components/SearchForm/SearchForm';
import OptionButton from './components/OptionButton/OptionButton'

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
      activeOption: "",
      searchFieldValuePlaceholder: "What do you want to draw",
      searchFieldValue: "",
      totalPages: 1,
      randomEdge: 3,
      json: {
        results: [
          {
            urls:{
              small: "https://images.unsplash.com/photo-1517250777203-905993e9060d?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjM2OTIyfQ&s=2fb09059653d6fc0c8701d6cfd55d67b"
            },
            user:{
              first_name: "author",
              links: {
                html: "#",
              }
            }
          },
          {
            urls:{
              small: "https://images.unsplash.com/photo-1517250777203-905993e9060d?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjM2OTIyfQ&s=2fb09059653d6fc0c8701d6cfd55d67b"
            },
            user:{
              first_name: "author",
              links: {
                html: "#",
              }
            }
          },
          {
            urls:{
              small: "https://images.unsplash.com/photo-1517250777203-905993e9060d?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjM2OTIyfQ&s=2fb09059653d6fc0c8701d6cfd55d67b"
            },
            user:{
              first_name: "author",
              links: {
                html: "#",
              }
            }
          },
        ]
      }
    }

    this.handleOptionClick = this.handleOptionClick.bind(this);
    this.handleGenerateClick = this.handleGenerateClick.bind(this);
    this.handleSearchOnChange = this.handleSearchOnChange.bind(this);
  }

  handleOptionClick(option){
    this.setState({
      activeOption: option
    });
  }

  handleGenerateClick(){
    const total = this.state.clicks; 
    unsplash.search.photos( this.state.searchFieldValue != "" ? this.state.searchFieldValue : this.state.searchFieldValuePlaceholder, Math.floor(Math.random() * this.state.totalPages +1), 30)
    .then(toJson)
      .then(json => {
        // Your code
        console.log(json)
        this.setState({
          json: json,
          randomEdge: json.results.length,
          totalPages: json.total_pages
        })
    });
  }

  handleSearchOnChange(e){
    this.setState({
      searchFieldValue: e.target.value
    })
  }

  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">stArtref</h1>
          <p>draw something new inspired by 2-3 refs</p>
        </header>
        <p className="App-intro">
           What do you want to draw?
        </p>
        
        <OptionButton option = "#characters" onClick = {this.handleOptionClick} className = {this.state.activeOption === "#characters"? "option-btn-active" : "option-btn"}/>
        <OptionButton option = "#environments" onClick = {this.handleOptionClick} className = {this.state.activeOption === "#environments"? "option-btn-active" : "option-btn"}/>    
        <br/>
        {/* <SearchForm onChange = {this.handleSearchOnChange} onSubmit = {this.handleGenerateClick} placeholder = {this.state.searchFieldValuePlaceholder} value = {this.state.searchFieldValue}/> */}
        <button onClick = {this.handleGenerateClick} className = "generate-btn">generate</button> 
        <div className="ref-wrapper">
          <Ref photoInfo = {this.state.json.results[Math.floor(Math.random() * this.state.randomEdge)]}/>
          <Ref photoInfo = {this.state.json.results[Math.floor(Math.random() * this.state.randomEdge)]}/>
          <Ref photoInfo = {this.state.json.results[Math.floor(Math.random() * this.state.randomEdge)]}/>
        </div>

        <Footer className = "footer"/>
      </div>
    );
  }
}

export default App;
