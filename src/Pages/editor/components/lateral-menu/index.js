/**
 * Module dependencies
 */
import React, { Component } from 'react';
import LateralFile from './../lateral-file/index';

export default class LateralMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
        <div className="lateral-list">
            <div className="lateral-title-container">
                <div className="title-item">
                    <p>Markdown Editor</p>
                </div>
            </div>
            <LateralFile DocumentName="Document 1" TimeElapsed="3 days Ago"/>
            <LateralFile DocumentName="Document 2" TimeElapsed="6 days Ago"/>
            <LateralFile DocumentName="Document 3" TimeElapsed="10 days Ago"/>
            <LateralFile DocumentName="Document 4" TimeElapsed="12 days Ago"/>
        </div>
    );
  }
}
