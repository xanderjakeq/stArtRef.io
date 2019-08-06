import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import styled from 'styled-components';

import * as firebase from 'firebase';

import StartRef from "./components/StartRef";
import Explore from "./components/Explore";
import NavBar from "./components/Navbar";
import Footer from './components/Footer';
import Authentication from './components/Authentication';
import Options from './components/Options';
import Upload from './components/Upload';
import UserSearch from './components/UserSearch';
import PostOverlay from "./components/PostOverlay";


class App extends Component {

  constructor(props){
    super(props)
    // The component's Local state.
    this.state = {
      username: ''
    };

    this.getUsername = this.getUsername.bind(this)

  }

  getUsername(username){
    this.setState({username: username})
  }

  render(){


    // testing

    // const FadingRoute = ({ component: Component, ...rest }) => (
    //   <Route {...rest} render={props => (
    //       <Component {...props}/>
    //   )}/>
    // )
    
    
    return(
      <Router>
        <div>
          <NavBar isLoggedIn = {false} />
          <MainWrapper>
            <Switch>
              <Route exact ={true} path = {"/"} component = {StartRef} />

              {/* If not Logged in Show Login Button instead of profile */}
              <Route path = {"/profile"} component = {Authentication}/>
              
              <Route path = {"/explore"} component = {Explore} />

              {/* Fix ArtWithRef  overlay later*/}
              <Route exact path = {'/settings'} component = {Options} />

              <Route exact path = {'/upload'} component = {Upload} />

              <Route exact path = {'/art/:postID'} component = {PostOverlay} />
              
              <Route path = {"/:id"} component = {UserSearch}/>
            </Switch>
          </MainWrapper>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;

const MainWrapper = styled.div`
  min-height: calc(100vh - 64px);
  padding-left: 2%;
  padding-right: 2%;
`;
