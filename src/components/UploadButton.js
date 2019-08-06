import React, { } from 'react';
import {Link} from "react-router-dom";

import {ShareBtn} from "../RefSet/RefSet";

const UploadButton = (props) => {
    return(
        <ShareBtn flexEnd fontSize = "20px">
                <Link to = {props.linkTo}><span className = "uploadButtonIcons">{props.content}</span></Link>
        </ShareBtn>
    )
}

export default UploadButton;
