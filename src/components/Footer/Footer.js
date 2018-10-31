import React from 'react';

const Footer = (props) => {
    return(
        <footer className = {props.className}>
            <h4>
                Made with 
                <span role="img" aria-label="Heart">❤️</span> 
                by <a href="https://medium.com/@xanderjakeq" target="_blank" rel="noopener noreferrer">xanderjakeq</a>
            </h4>
        </footer>
    );
}

export default Footer;