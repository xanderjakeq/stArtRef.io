import React, {  } from 'react';
import {Link} from "react-router-dom";

import './NavBar.css';
import logo from '../../logo.svg';

const NavBar = (props) => {
    return(
        <div className="startref_nav" >
            <Link to = "/">        
                <img src={logo} alt="startref logo" />
            </Link>
            <div className="startref_icons">
                <Link to = "/explore"><span role = "img" className = "navIcons" aria-label = "explore">🖼️</span></Link>
                <Link to = "/profile"><span role = "img" className = "navIcons" aria-label = "profile">🙈</span></Link>
            </div>
        </div>
    )
}

export default NavBar;