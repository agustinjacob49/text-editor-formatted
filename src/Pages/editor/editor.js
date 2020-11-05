import React, { Component } from 'react';
import './style.css';
import LateralMenu from './components/lateral-menu';
import TextEditor from './components/text-editor';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';

export default class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items : [],
      elements : [],
      loading: true,
      item : {},
    };
    this.onFileSelected = this.onFileSelected.bind(this);
    this.makeTittle = this.makeTittle.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.makeP = this.makeP.bind(this);
    this.makeCode = this.makeCode.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.fetchDocuments = this.fetchDocuments.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.newDocument = this.newDocument.bind(this);
  }

  componentDidMount() {
    this.fetchDocuments();
  }

  onFileSelected(item) {
    const { items } = this.state;
    let indexItem = 0;
    items.map((i, k) => {
      if (i.selected){
        i.selected = false;
      }
      if(i.id === item){
        indexItem = k;
        i.selected = true;
      }
      return i;
    });

    this.setState({items, item: items[indexItem]}, () => {
      this.handleChangeText(items[indexItem].lines);
      document.getElementById('title-document').value = items[indexItem].nombre;
    });
  }

  handleChangeText(lines){
    let itemToSave = {
      nombre: "",
      lines,
    };
    const { item } = this.state;
    if (item.id !== undefined){
      item.lines = lines;
      itemToSave = item;
    }

    this.setState({elements : [], item: itemToSave}, 
      () => {
        window.setTimeout(() => {
          let i = 0;
          while( i < lines.length)
          {
              let text = lines[i];
              switch(text[0]) {
                case '#': {
                  this.makeTittle(text);
                  break;
                }
                case '`': {
                  let linesInserted = this.makeCode(lines, i);
                  i += linesInserted;
                  break;
                }
                default: {
                  this.makeP(text);
                  break;
                }
              }
              i += 1;
          }
        }, 100);
      }
    );

  }

  makeTittle(text){
    const { elements } = this.state;
    if (text.length >= 3){
      if (text[1] === '#' && text[2] === '#'){
        let textFinal = text.slice(3);
        let element = <h3>{textFinal}</h3>
        let elementsOld = elements;
        elements.push(element);
        this.setState({elements: elementsOld});
      } else if (text[1] === '#'){
        let textFinal = text.slice(2);
        let element = <h2>{textFinal}</h2>
        let elementsOld = elements;
        elements.push(element);
        this.setState({elements: elementsOld});
      } else {
        let textFinal = text.slice(1);
        let element = <h1>{textFinal}</h1>
        let elementsOld = elements;
        elements.push(element);
        this.setState({elements: elementsOld});
      }
    }
  }

  makeCode(lines, index){
    const { elements } = this.state;
    let stop = 0;
    let counter = 0;
    let textsFinal = [];
    lines.forEach((l, k) => {
      let reverse = this.reverseString(l);
      if (reverse.length >=3){
        if (reverse[0] === "´" && reverse[1] === "´" && reverse[2] === "´" && k!==0){
          stop = k;
        }
      }
    });
    if(stop !== 0){
      for (var i = index; i < stop; i++) {
        let line = lines[i];
        if ((line[0] !== '`' && line[1] !== '`' && line[2] !== '`')){
          counter += 1;
          textsFinal.push(line);
        }
      }
      let element = <pre>{textsFinal.map( (e) => (<div><code>{e}</code><br></br></div>))}</pre>;
      let elementsOld = elements;
      elements.push(element);
      this.setState({elements: elementsOld});
      return counter + 1;
    }
    return 0;
  }

  makeP(text){
    const { elements } = this.state;
    let element = <p>{text}</p>
    let elementsOld = elements;
    elements.push(element);
    this.setState({elements: elementsOld});
  }

  reverseString(str) {
    var splitString = str.split(""); 
    var reverseArray = splitString.reverse();
    var joinArray = reverseArray.join(""); 
    return joinArray;
  }

  fetchDocuments(){
    fetch('/api/documents')
    .then((res) => res.json())
    .then((documentos) => {
      documentos.map( (d) => (d.selected = false));
      this.setState({ loading: false, items:documentos, item:{} });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  deleteItem(id){
    fetch(`/api/documents/${id}`, {
      method: 'DELETE'
    })
    .then((res) => res.json())
    .then((documentos) => {
      this.fetchDocuments();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  saveItem(){
    const { item } = this.state;
    if(item.id !== undefined){
      this.updateItem(item);
    } else {
      let itemToSave = item;
      itemToSave.nombre = document.getElementById('title-document').value;
      fetch(`/api/documents/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state.item)
      })
      .then((res) => res.json())
      .then((documentos) => {
        this.fetchDocuments();
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  updateItem(item){
    item.nombre = document.getElementById('title-document').value;
    fetch(`/api/documents/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    })
    .then((res) => res.json())
    .then((documentos) => {
      this.fetchDocuments();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  newDocument(){
    this.fetchDocuments();
    document.getElementById('title-document').value = '';
    this.setState({item: { lines : []}});
  }

  render() {
    return (
      <div className="main-container">
        {this.state.loading && <LinearProgress />}
        <div className="row">
          <div className="column-xs" >
            <LateralMenu 
              items={this.state.items} 
              onFileSelected={this.onFileSelected}
              onClickDelete={this.deleteItem}
            />
          </div>
          <div className="column-m" >
            <div>
            <input type="text"  id="title-document" name="name" className="text-box" placeholder="Title"/>
            <Button 
              variant="outlined"
              className="button"
              onClick={this.newDocument}
              >
              New
            </Button>
            <Button 
              color="primary" 
              variant="contained"
              className="button"
              onClick={this.saveItem}
              >
              Save
            </Button>
            </div>
            <TextEditor 
            handleChaneText={this.handleChangeText}
            lines={this.state.item.lines}
            />
          </div>
          <div className="column-m column-right" >
            {this.state.elements}
          </div>
        </div>
    </div>
    );
  }
}