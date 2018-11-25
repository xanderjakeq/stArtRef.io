import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

import StartRef from "./components/StartRef/StartRef";
import UserProfile from "./components/UserProfile/UserProfile";
import Sample from "./components/UserProfile/Sample";

class App extends Component {
  render(){
    return(
      <Router>
        <div>
        <Route exact={true} path = {"/"} component = {StartRef} />
        <Route path = {"/:id"} component = {UserProfile}/>
        <Route path = {"/sample"} component = {Sample}/>
        </div>
      </Router>
    );
  }
}

function Child({ match }) {
  return (
    <div>
      <h3>ID: {match.params.id}</h3>
    </div>
  );
}

export default App;
