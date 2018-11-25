import React, { Component } from 'react';

const UserProfile = (props) => {
    return(
        <div>
            <h3>@{props.match.params.id}</h3>
        </div>
    )
}

export default UserProfile;