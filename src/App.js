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
import firebaseApp from './components/config/firebaseApp'
import Options from './components/Options/Options';
import Upload from './components/Upload/Upload'

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
          <div id = "MainWrapper">
            <Switch>
              <Route exact ={true} path = {"/"} component = {StartRef} />

              {/* If not Logged in Show Login Button instead of profile */}

              <Route path = {"/profile"} component = {Authentication}/>
              
              <Route path = {"/explore"} component = {Explore} />

              {/* Fix ArtWithRef  overlay later*/}
              <Route path = {'/options'} component = {Options} />

              <Route path = {'/upload'} component = {Upload} />

              {/* <Route path= "/explore/:id" component={ArtWithRef} /> */}
              {/* <Route exact= {true} path= "/login" component={Authentication} /> */}
              
              {/* <Route path = {"/:id"} component = {UserProfile}/> */}
              {/* <FadingRoute path="/cool" component={Authentication}/> */}

              

            </Switch>
          </div>
          <Footer className = "footer"/>
        </div>
      </Router>
    );
  }
}




export default App;
