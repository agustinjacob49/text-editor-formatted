/**
 * Module dependencies
 */
import React, { Component } from 'react';
import DescriptionIcon from '@material-ui/icons/Description';
import Button from '@material-ui/core/Button';
import './style.css';
export default class LateralFile extends Component {
  render() {
    const { documentName, timeElapsed, selected, onFileSelected, onClickDelete } = this.props;
    return (
        <div 
          className={`lateral-item-container ${selected ? 'selected-item' : ''}`}
          onClick={onFileSelected}
        >
            <div className="icon-lateral-list">
            <DescriptionIcon/>
            </div>
            <div className="text-lateral-list">
            <p className="title-document">{documentName}</p>
            <p className="time-document">{timeElapsed}</p>
            <Button 
              color="Secondary"
              className="button-delete"
              onClick={onClickDelete}
            >
              Delete
            </Button>
            </div>
        </div>
    );
  }
}
