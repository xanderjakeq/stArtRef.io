import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

import StartRef from "./components/StartRef/StartRef";
import UserProfile from "./components/UserProfile/UserProfile";
import NavBar from "./components/NavBar/NavBar";
import Footer from './components/Footer/Footer';

class App extends Component {
  render(){
    return(
      <Router>
        <div>
          <NavBar />
        <Route exact={true} path = {"/"} component = {StartRef} />
        <Route path = {"/:id"} component = {UserProfile}/>
        <Footer className = "footer"/>
        </div>
      </Router>
    );
  }
}


export default App;
