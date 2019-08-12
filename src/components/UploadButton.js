import React from 'react';
import {Link} from "react-router-dom";
import {Plus} from "react-feather";

import {Wrapper} from "./Post";

const UploadButton = (props) => {
    return(
        <Link to = {props.linkTo}>
            <Wrapper>
                <Plus color = "black" size = {30}/>
            </Wrapper>
        </Link>
    )
}

export default UploadButton;