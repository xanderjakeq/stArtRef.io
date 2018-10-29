import React, { Component } from 'react';
import Unsplash, {toJson} from 'unsplash-js';


class OptionButton extends Component  {

    constructor(props){
        super(props)

        this.state = {
            active: false
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.onClick(this.props.option);
        this.setState({
            active: !this.state.active
        })   
    }

    render(){
        return(
            <button className = {this.props.className} onClick = {this.handleClick}>{this.props.option}</button>
        );  
    }
}

export default OptionButton;