import React from 'react';

import {Ref} from './Ref';

import loading from "../assets/loading.png";

const Scribble = (props) => {

    return(
        // <div className="refs scribble">
        <Ref>
            <a href = {'https://www.instagram.com/startrefio/'} target="_blank"><img src = {props.scribbleUrl ? props.scribbleUrl : loading} alt = "Scribble"></img></a>
            {/* <p className = "author">by <a href={props.photoInfo.user.links.html + "?utm_source=startref&utm_medium=referral"} target="_blank"> {props.photoInfo.user.name} </a></p> */}
            {
                props.scribbleUrl ? 
                <p className = "author"></p>
                :
                <p className = "author">follow <a href="https://www.patreon.com/xanderjakeq" target="_blank">xanderjakeq</a></p>
            }
        </Ref>
    );
}

export default Scribble;
