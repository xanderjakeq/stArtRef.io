import React, { Component } from 'react';

import './NavBar.css';
import logo from '../../logo.svg';

const NavBar = (props) => {
    return(
        <div className="startref_nav" >
        <img src={logo} alt="startref logo" />
        <h1 className="appName">stArtRef</h1>
        <div className="startref_icons">
            <div className=" far fa-heart ">Explore</div>
            <div className=" far fa-user ">Profile</div>
        </div>
        </div>
    )
}

export default NavBar;