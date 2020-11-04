/**
 * Module dependencies
 */
import React, { Component } from 'react';
import DescriptionIcon from '@material-ui/icons/Description';
import './style.css';
export default class LateralFile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { documentName, timeElapsed, selected } = this.props;
    return (
        <div className={`lateral-item-container ${selected ? 'selected-item' : ''}`}>
            <div className="icon-lateral-list">
            <DescriptionIcon/>
            </div>
            <div className="text-lateral-list">
            <p className="title-document">{documentName}</p>
            <p className="time-document">{timeElapsed}</p>
            </div>
        </div>
    );
  }
}
