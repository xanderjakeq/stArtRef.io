import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

const NavIcon = (props) => {
	const {icon: Icon} = props;
	return (
		<NavIconWrapper>
			<Link to = {props.to}>
				{props.logo ? 
					<img src={logo} alt="startref logo" />
					:
					<Icon/>
				}
			</Link>
		</NavIconWrapper>
	)
}

export default NavIcon;

const NavIconWrapper = styled.div`

`;