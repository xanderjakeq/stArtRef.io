import React from 'react';

const Reference = (props) => {

    return(
        <div className="refs">
            <a href = {props.photoInfo.urls.regular} target="_blank"><img src = {props.photoInfo.urls.small} alt = "Reference"></img></a>
            <p className = "author">by <a href={props.photoInfo.user.links.html + "?utm_source=startref&utm_medium=referral"} target="_blank"> {props.photoInfo.user.name} </a></p>
        </div>
    );
}

export default Reference;
