/**
 * Module dependencies
 */
import React, { Component } from 'react';
import DescriptionIcon from '@material-ui/icons/Description';

export default class LateralFile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { DocumentName, TimeElapsed } = this.props;
    return (
        <div className="lateral-item-container">
            <div className="icon-lateral-list">
            <DescriptionIcon/>
            </div>
            <div className="text-lateral-list">
            <p className="title-document">{DocumentName}</p>
            <p className="time-document">{TimeElapsed}</p>
            </div>
        </div>
    );
  }
}
