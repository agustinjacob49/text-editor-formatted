import React, { Component } from 'react';
import './style.css';
import LateralMenu from './components/lateral-menu';
import TextEditor from './components/text-editor';
import LinearProgress from '@material-ui/core/LinearProgress';

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

export default class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items : [],
      elements : [],
      loading: true
    };
    this.onFileSelected = this.onFileSelected.bind(this);
    this.makeTittle = this.makeTittle.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.makeP = this.makeP.bind(this);
    this.makeCode = this.makeCode.bind(this);
  }

  componentDidMount() {
    fetch('/api/documents')
    .then((res) => res.json())
    .then((documentos) => {
      documentos.map( (d) => (d.selected = false));
      this.setState({ loading: false, items:documentos });
    })
    .catch((err) => {
      console.log(err);
    });
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

    this.handleChangeText(items[indexItem].lines);
    this.setState({items});
  }

  handleChangeText(lines){
    this.setState({elements : []}, 
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
    let textFinal = '';
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
    if(stop != 0){
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

  render() {
    return (
      <div className="main-container">
        {this.state.loading && <LinearProgress />}
        <div className="row">
          <div className="column-xs" >
            <LateralMenu 
              items={this.state.items} 
              onFileSelected={this.onFileSelected}
            />
          </div>
          <div className="column-m" >
            <TextEditor 
            handleChaneText={this.handleChangeText}
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