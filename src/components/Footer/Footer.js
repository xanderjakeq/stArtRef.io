import React, { Component } from 'react';
import Unsplash, {toJson} from 'unsplash-js';

const styles = {
    width: 400,
    height: 250,
    overflow: 'hidden'
}

const Footer = (props) => {
    return(
        <footer className = {props.className}>
            <h5>Made with ❤️ by <a href="https://medium.com/@xanderjakeq" target="_blank">xanderjakeq</a></h5>
        </footer>
    );
}

export default Footer;