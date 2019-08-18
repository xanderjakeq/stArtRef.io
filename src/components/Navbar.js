import React, {useState, useEffect} from 'react';
import {Compass, User} from "react-feather";

import styled from "styled-components";

import logo from "../assets/logo1.svg";
import NavIcon from "./minor/NavIcon";

const NavBar = (props) => {
    const [activeIcon, setActiveIcon] = useState(window.location.href.split('/')[3]);

    return(
        <Nav>
            <NavIcon to = "/" logo = {logo} id = {0} active = {activeIcon} click = {changeActiveIcon}/>
            <div className="startref_icons">
                <NavIcon to = "/explore" icon = {Compass} id = {1} active = {activeIcon} click = {changeActiveIcon}/>
                <NavIcon to = "/profile" icon = {User} id = {2} active = {activeIcon} click = {changeActiveIcon}/>
            </div>
        </Nav>
    )

    function changeActiveIcon(iconId) {
       setActiveIcon(iconId)
    }
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
  
    .insta_text {
        padding-left: 10px;
    }

    .navIcons{
        font-size: 30px;
        vertical-align: middle;
        line-height: 2;
    }

    .startref_icons{
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }

    @media only screen and (min-width: 600px) {
        padding: 5px 0;
        border-bottom: 1px solid rgba(0,0,0,.0975);
        
        .navIcons{
            font-size: 50px;
        }
    }
`;