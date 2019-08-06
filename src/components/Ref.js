import React from 'react';

import styled from 'styled-components';

import loading from '../loading.png';

export const Ref = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    height: min-content;
    a {
        width: 100%;
        img {
            width: 100%;
        }
    }
    @media only screen and (min-width:321px){
        margin: 20px;
    }
`;


const Reference = (props) => {

    return(
        <Ref>
            <a href = {props.photoInfo.links.html} target="_blank"><img src = {props.photoInfo.urls.small ? props.photoInfo.urls.small : loading} alt = "Reference"></img></a>
            {
                props.photoInfo.urls.small ? 
                <p className = "author">by <a href={props.photoInfo.user.links.html + "?utm_source=startref&utm_medium=referral"} target="_blank"> {props.photoInfo.user.name} </a></p>
                :
                <p className = "author">follow <a href="https://www.patreon.com/xanderjakeq" target="_blank">xanderjakeq</a></p>
            }
        </Ref>
    );
}

export default Reference;
