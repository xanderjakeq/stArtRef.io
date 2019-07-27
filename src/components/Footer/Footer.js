import React from 'react';
import styled from 'styled-components';

const Footer = (props) => {
    return(
        <Footr>
            <h4>
                Made with 
                <span role="img" aria-label="Heart">❤️</span> 
                by <a href="https://medium.com/@xanderjakeq" target="_blank" rel="noopener noreferrer">xanderjakeq</a>
            </h4>
        </Footr>
    );
}

export default Footer;

const Footr = styled.footer`
    /* position: fixed; */
    /* width: 100%;
    height: 10vh; */
    height: var(--footer-height);
    /* bottom: 0px; */
    position: relative;
    bottom: 0;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color: rgb(70,83,98, .9);
    a{
        color:#06ffc7;
    }
`;