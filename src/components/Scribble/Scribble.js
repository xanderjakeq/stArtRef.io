import React from 'react';

import {Ref} from '../Ref/Ref';

const Scribble = (props) => {

    return(
        // <div className="refs scribble">
        <Ref>
            <a href = {'https://www.instagram.com/startrefio/'} target="_blank"><img src = {props.scribbleUrl} alt = "Scribble"></img></a>
            {/* <p className = "author">by <a href={props.photoInfo.user.links.html + "?utm_source=startref&utm_medium=referral"} target="_blank"> {props.photoInfo.user.name} </a></p> */}
        </Ref>
    );
}

export default Scribble;
