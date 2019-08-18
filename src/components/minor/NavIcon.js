import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

const NavIcon = (props) => {
	const {icon: Icon} = props;
	const page = props.to.replace('/', '');
	const isActive = props.active === page;
	return (
		<NavIconWrapper active = {page === props.active}>
			<Link to = {props.to} onClick = {() => props.click(page)}>
				{props.logo ? 
					<img src={props.logo} alt="startref logo" width = {isActive ? "60px" : "50px"}/>
					:
					<Icon color = "black" size = {isActive ? 40 : 30}/>
				}
			</Link>
		</NavIconWrapper>
	)
}

export default NavIcon;

const NavIconWrapper = styled.div`
	svg, img{
		transition-duration: .5s;
	}
	a{
		display: flex;
		font-size: 40px;
        text-decoration: none;
		margin: 0 10px;
		&:active{
			background:none;
		}
    }
`;