import React, { Component } from 'react';
import './style.css';
import DescriptionIcon from '@material-ui/icons/Description';

export default class Editor extends Component {
  render() {
    return (
      <div className="main-container">
        <div className="row">
          <div className="column-xs" >
            <div className="lateral-list">
              <div className="lateral-title-container">
                <div className="title-item">
                  <p>Markdown Editor</p>
                </div>
              </div>
              <div className="lateral-item-container">
                <div className="icon-lateral-list">
                  <DescriptionIcon/>
                </div>
                <div className="text-lateral-list">
                  <p className="title-document">Documento 1</p>
                  <p className="time-document">3 days ago</p>
                </div>
              </div>
              <div className="lateral-item-container">
                <div className="icon-lateral-list">
                  <DescriptionIcon/>
                </div>
                <div className="text-lateral-list">
                  <p className="title-document">Documento 1</p>
                  <p className="time-document">3 days ago</p>
                </div>
              </div>
              <div className="lateral-item-container">
                <div className="icon-lateral-list">
                  <DescriptionIcon/>
                </div>
                <div className="text-lateral-list">
                  <p className="title-document">Documento 1</p>
                  <p className="time-document">3 days ago</p>
                </div>
              </div>
              <div className="lateral-item-container">
                <div className="icon-lateral-list">
                  <DescriptionIcon/>
                </div>
                <div className="text-lateral-list">
                  <p className="title-document">Documento 1</p>
                  <p className="time-document">3 days ago</p>
                </div>
              </div>
            </div>
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