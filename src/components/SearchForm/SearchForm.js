import React, { Component } from 'react';

class SearchForm extends Component {

    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(event) {
        event.preventDefault();
      }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" value = {this.props.value} onChange = {this.props.onChange} placeholder = {this.props.placeholder} className="form-input"/>
            </form>
        );
    }
}

export default SearchForm;
