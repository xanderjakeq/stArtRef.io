import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";

import './NavBar.css';
import logo from '../../logo.svg';

const NavBar = (props) => {
    return(
        <div className="startref_nav" >
            <Link to = "/">        
                <img src={logo} alt="startref logo" />
            </Link>
            <h1 className="appName">stArtRef</h1>
            <div className="startref_icons">
                <Link to = "/explore">Explore</Link>
                <IsLoggedIn isLoggedIn = {props.isLoggedIn} /> 
            </div>
            {/* <IsLoggedIn IsLoggedIn = {props.isLoggedIn} /> */}
        </div>
    )
}

function IsLoggedIn(props){
    if(props.isLoggedIn){
        return <Link to = "/profile">Profile</Link>
    }else{
        return <Link to = "/login">Profile</Link>
    }
}

export default NavBar;