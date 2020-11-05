/**
 * Module dependencies
 */
import React, { Component } from 'react';

export default class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
        text: '',
        lines: [],
        contentUnformatted: '',
        openText: false,
    };
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  componentWillReceiveProps(){
    const { lines } = this.props;
    if (lines !== undefined){
      let contentUnformatted = '';
      lines.forEach( (l) => ( contentUnformatted += l + '\n'));
      this.setState({contentUnformatted});
      document.getElementById('text-area-component').value = contentUnformatted;
    }
  }

  onKeyPress(event){
    if(event.key === 'Enter'){
        let lines = document.getElementById('text-area-component').value.split('\n');
        this.props.handleChaneText(lines);
    }
  }


  render() {
    return (
        <textarea 
            id="text-area-component"
            className="text-editor-area"
            onKeyPress={this.onKeyPress}>
        </textarea>
    );
  }
}