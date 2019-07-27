import React, { } from 'react';
import {Link} from 'react-router-dom';

import styled from 'styled-components';

const Post = (props) => {
    return( 
        <Wrapper>
            <Link to = {props.url}>
                <Art src={props.post.data.artLink} onClick = {props.click(props.post)} alt = 'art'/>       
            </Link>
        </Wrapper>
    )
}

export default Post;

const Wrapper = styled.div`
    width: calc(100%/5);
    margin: 10px; 
`;

const Art = styled.img`
    display: block;
    width: 100%;
    height: 100%;
`;