import React from 'react';

const Scribble = (props) => {

    return(
        <div className="ref scribble">
            <a href = {props.scribbleUrl} target="_blank"><img src = {props.scribbleUrl} alt = "Scribble"></img></a>
            {/* <p className = "author">by <a href={props.photoInfo.user.links.html + "?utm_source=startref&utm_medium=referral"} target="_blank"> {props.photoInfo.user.name} </a></p> */}
        </div>
    );
}

export default Scribble;
