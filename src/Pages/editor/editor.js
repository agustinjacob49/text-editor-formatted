import React, { Component } from 'react';
import './style.css';
import LateralMenu from './components/lateral-menu';

export default class Editor extends Component {
  render() {
    const items = [
      {
          documentTitle: 'Documento 1',
          timeElapsed: '3 days',
          selected: true
      },
      {
          documentTitle: 'Documento 2',
          timeElapsed: '3 days',
          selected: false
      },
      {
          documentTitle: 'Documento 3',
          timeElapsed: '3 days',
          selected: false
      }
  ];

    return (
      <div className="main-container">
        <div className="row">
          <div className="column-xs" >
            <LateralMenu items={items} />
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