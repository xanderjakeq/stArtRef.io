import React, {  } from 'react';
import {Link} from "react-router-dom";

import styled from 'styled-components';

import logo from '../logo.svg';

const NavBar = (props) => {
    return(
        <Nav>
            <Link to = "/">        
                <img src={logo} alt="startref logo" />
            </Link>
            <div className="startref_icons">
                <Link to = "/explore"><span role = "img" className = "navIcons" aria-label = "explore">🖼️</span></Link>
                <Link to = "/profile"><span role = "img" className = "navIcons" aria-label = "profile">🙈</span></Link>
            </div>
        </Nav>
    )
}

export default NavBar;

const Nav = styled.nav`
    position: fixed;
    top:0;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    background-color: #fff;
    font-size: 25px;

    border-bottom: 1px solid rgba(0,0,0,.0975);
  
    img {
        width: 50px;
        /* to push left border */
        padding-left: 20%;
    }
    
    .insta_text {
        padding-left: 10px;
    }
    
    a{
        text-decoration: none;
        display: inline;
        padding-right: 10px;
    }

    .navIcons{
        font-size: 30px;
        vertical-align: middle;
        line-height: 2;
    }

    @media only screen and (min-width: 600px) {
        padding: 5px 0;
        border-bottom: 1px solid rgba(0,0,0,.0975);
        img {
            width: 100px;
        }
        .navIcons{
            font-size: 50px;
        }
    }
`;