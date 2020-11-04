import React, { Component } from 'react';
import './style.css';
import LateralMenu from './components/lateral-menu';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    const items = [
      {
          id: 1,
          documentTitle: 'Documento 1',
          timeElapsed: '3 days',
          selected: true
      },
      {
          id: 2,
          documentTitle: 'Documento 2',
          timeElapsed: '3 days',
          selected: false
      },
      {
          id: 3,
          documentTitle: 'Documento 3',
          timeElapsed: '3 days',
          selected: false
      }
    ];
    this.state = {
      items
    };
    this.onFileSelected = this.onFileSelected.bind(this);
  }

  onFileSelected(item) {
    const { items } = this.state;
    items.map((i, k) => {
      if (i.selected){
        i.selected = false;
      }
      if(i.id === item.id){
        i.selected = true;
      }
      return i;
    });
    this.setState({items});
  }

  render() {
    

    return (
      <div className="main-container">
        <div className="row">
          <div className="column-xs" >
            <LateralMenu 
              items={this.state.items} 
              onFileSelected={this.onFileSelected} 
            />
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