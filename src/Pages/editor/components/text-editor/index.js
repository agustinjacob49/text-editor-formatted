/**
 * Module dependencies
 */
import React, { Component } from 'react';

export default class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
        text: '',
        openText: false,
    };
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onKeyPress(event){
    if(event.key === 'Enter'){
        let lines = document.getElementById('text-area-component').value.split('\n');
        this.props.handleChaneText(lines);
    }
  }


  render() {
    const {} = this.props;
    return (
        <textarea 
            id="text-area-component"
            className="text-editor-area"
            onKeyPress={this.onKeyPress} >
        </textarea>
    );
  }
}