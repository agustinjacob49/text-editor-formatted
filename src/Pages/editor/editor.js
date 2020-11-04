import React, { Component } from 'react';
import './style.css';
import LateralMenu from './components/lateral-menu';

export default class Editor extends Component {
  render() {
    return (
      <div className="main-container">
        <div className="row">
          <div className="column-xs" >
            <LateralMenu />
          </div>
          <div className="column-m" >
            <textarea className="text-editor-area">
              # Titulo
            </textarea>
          </div>
          <div className="column-m column-right" >
          </div>
        </div>
    </div>
    );
  }
}