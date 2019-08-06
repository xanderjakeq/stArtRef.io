import React, {useState, useEffect} from 'react';
import firebase from '../config/firebaseApp';
import {connect} from "react-redux";

import styled from "styled-components";
import {Wrapper, Art} from "../Post/Post";
import {RefSet} from "../StartRef/StartRef";

import Ref from '../Ref/Ref'
import Scribble from '../Scribble/Scribble'

const Overlay = (props) => {

    const [post, setPost] = useState();

    useEffect(() => {
        if (Object.entries(props.post).length === 0 && props.post.constructor === Object) {
            firebase.database().ref().child('Posts/' + props.match.params.postID).once('value', snap => {
                setPost(snap.val())
            })
        }
        else {
            setPost(props.post)
        }
    },[])

    return post !== undefined ? (
        <OverlayWrapper>
            <ClosetBtn className="close-thin" onClick = {() => props.history.goBack()}/>
            <CenteredColumnFlex>
                <Wrapper size = "300px">
                    <Art src = {post.artLink} onClick = {() => props.history.push(`/${post.author}`)} alt = 'Art'/>
                </Wrapper>

                <RefSet>
                    <Ref photoInfo = {post.refLinks[0]}/>
                    <Scribble scribbleUrl = {post.refLinks[1]}/>
                    <Ref photoInfo = {post.refLinks[2]}/>
                </RefSet>
            </CenteredColumnFlex>
        </OverlayWrapper>
    ) 
    :
    null
}

const mstp = state => {
    return {
        post: state.posts.activePost
    }
}

export default connect(mstp,{})(Overlay);

const OverlayWrapper = styled.div`
    position: absolute;
    width: 100%;
    min-height: 100vh;
    top: 0; 
    left: 0;
    background: #FDF9F0; 
    z-index: 10;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const ClosetBtn = styled.button`
    background: none;
    border: none;
    outline: none;
    color: #777;
    font: 14px/100% arial, sans-serif;
    position: fixed;
    right: 10px;
    top: 10px;
    text-decoration: none;
    text-shadow: 0 1px 0 #fff;

    &:after {
        content: '✖'; /* UTF-8 symbol */
    }

    &:hover {
        cursor: pointer;
    }

    @media only screen and (min-width: 350px) {
        right: 20px;
        top: 20px;
    }
`;

const CenteredColumnFlex = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;