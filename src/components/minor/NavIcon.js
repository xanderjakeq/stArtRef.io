import React from "react";
import {Link} from "react-router-dom";
import styled, {css} from "styled-components";

const NavIcon = (props) => {
	const {icon: Icon} = props;
	const page = props.to.replace('/', '');
	const isActive = props.active === page;
	return (
		<NavIconWrapper active = {page === props.active}>
			<Link to = {props.to} onClick = {() => props.click(page)}>
				{props.logo ? 
					<img src={props.logo} alt="startref logo" width = "50px"/>
					:
					props.svg ? 
						<img src={props.svg} alt="icon" width = "30px"/>
						:
						<Icon color = "black" size = {40}/>
				}
			</Link>
		</NavIconWrapper>
	)
}

export default NavIcon;

const NavIconWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 50px;
	&::after{
		content: "";
		display: block;
		padding-top: 5px;
		width: 0;
		border-bottom: 1px solid black;
		transition: .5s;
		${props => props.active && css`
				width: 100%;
		`}
	}
	
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