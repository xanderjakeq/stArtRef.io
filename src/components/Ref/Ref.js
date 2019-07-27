import React from 'react';

import styled from 'styled-components';

export const Ref = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    width: 300px;
    height: min-content;
    a {
        width: 100%;
        img {
            width: 100%;
        }
    }
`;

const Reference = (props) => {

    return(
        <Ref>
            <a href = {props.photoInfo.links.html} target="_blank"><img src = {props.photoInfo.urls.small} alt = "Reference"></img></a>
            <p className = "author">by <a href={props.photoInfo.user.links.html + "?utm_source=startref&utm_medium=referral"} target="_blank"> {props.photoInfo.user.name} </a></p>
        </Ref>
    );
}

export default Reference;
