/**
 * Module dependencies
 */
import React, { Component } from 'react';
import LateralFile from './../lateral-file/index';

export default class LateralMenu extends Component {
  constructor(props) {
    super(props);
    this.onClickFileSelected = this.onClickFileSelected.bind(this)

  }

  onClickFileSelected(item){
    this.props.onFileSelected(item);
  }

  render() {
    const { items } = this.props;

    return (
        <div className="lateral-list">
            <div className="lateral-title-container">
                <div className="title-item">
                    <p>Markdown Editor</p>
                </div>
            </div>
            {items.map((item, index) => (
                <LateralFile
                    key={item.createdAt}
                    documentName={item.nombre}
                    timeElapsed={item.updatedAt}
                    selected={item.selected}
                    onFileSelected={() => this.onClickFileSelected(item.id)}
                />
            ))}
        </div>
    );
  }
}
