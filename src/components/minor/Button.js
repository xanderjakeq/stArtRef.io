import React from "react";
import styled from "styled-components";

const Button = (props) => {
	return (
		<Btn onClick = {props.click} title = {props.title ? props.title : null}>
			{props.content}
		</Btn>
	)
}

export default Button;

const Btn = styled.button`
	position: relative;
	width: 100px;
	height: 40px;
	margin: 10px;

	box-shadow: 0px 1px 8px rgba(23, 42, 58, 0.37);
	background: #1DD3B0;
	border-radius: 5px;
	border: none;
	&:hover{
		cursor: pointer;
		background: #1DD3C5;
	}
	outline: none;
	&:active{
		background: black;
	}
`;