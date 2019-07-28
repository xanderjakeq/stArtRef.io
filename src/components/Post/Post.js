import React, { } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import {connect} from "react-redux";

import {setActivePost} from "../../actions";

const Post = (props) => {
    return( 
        <Wrapper>
            <Link to = {props.url}>
                <Art src={props.post.data.artLink} onClick = {()=>props.setActivePost(props.post.data)} alt = 'art'/>       
            </Link>
        </Wrapper>
    )
}

const mstp = state => {
    return {}
}

export default connect(mstp, {setActivePost})(Post);

Post.propTypes = {
    url: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    click: PropTypes.func.isRequired
}

export const Wrapper = styled.div`
    width: 100px;
    height: 100px;
    margin: 1px; 

    &:hover{
        cursor: pointer;
    }

    @media only screen and (min-width: 350px) {
        margin: 5px; 
    }
    @media only screen and (min-width: 700px) {
        width: 200px;
        height: 200px;
        margin: 10px; 
    }
    ${props => props.size && css`
        width: ${props.size};
        height: ${props.size};
        margin: 25px 0;

        @media only screen and (min-width: 350px) {
            margin: 25px 0; 
        }
        @media only screen and (min-width: 700px) {
            width: ${props.size};
            height: ${props.size};
        }
    `}
`;

export const Art = styled.img`
    display: block;
    width: 100%;
    height: 100%;
`;