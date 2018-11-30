import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";


import * as firebase from 'firebase';

import StartRef from "./components/StartRef/StartRef";
import Explore from "./components/Explore/Explore";
import UserProfile from "./components/UserProfile/UserProfile";
import NavBar from "./components/NavBar/NavBar";
import Footer from './components/Footer/Footer';
import ArtWithRef from './components/ArtWithRef/ArtWithRef';
import Authentication from './components/Authentication/Authentication';

class App extends Component {
  render(){
    return(
      <Router>
        <div>
          <NavBar isLoggedIn = {false} />
          <div id = "MainWrapper">
            <Switch>
              <Route exact ={true} path = {"/"} component = {StartRef} />

              {/* If not Logged in Show Login Button instead of profile */}

              <Route exact = {true} path = {"/profile"} component = {UserProfile}/>
              
              <Route exact = {true} path = {"/explore/"} component = {Explore} />

              {/* Fix ArtWithRef  overlay later*/}

              <Route path= "/explore/:id" component={ArtWithRef} />
              <Route exact= {true} path= "/login" component={Authentication} />
              
              <Route path = {"/:id"} component = {UserProfile}/>

              

            </Switch>
          </div>
          <Footer className = "footer"/>
        </div>
      </Router>
    );
  }
}




export default App;
