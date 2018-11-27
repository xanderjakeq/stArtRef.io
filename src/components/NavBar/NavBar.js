import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";

import './NavBar.css';
import logo from '../../logo.svg';

const NavBar = (props) => {
    return(
        <div className="startref_nav" >
            <img src={logo} alt="startref logo" />
            <h1 className="appName">stArtRef</h1>
            <div className="startref_icons">
                <Link to = "/explore">Explore</Link>
                <Link to = "/profile">Profile</Link>
            </div>
        </div>
    )
}

export default NavBar;