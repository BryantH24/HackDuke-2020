/*global chrome*/
import React, { Component } from 'react';
import heart from "../src/assets/heart.svg"
import line from "../src/assets/line.svg"

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      uniqueCode: `<scan>`,
      inputs: {
        priceperword: '0.05'
      }
    }
  }

  nextTapped_det = () => {
    var config = {
      code: this.state.uniqueCode
    };

    if(this.state.inputs.priceperword > 0) {
      config['priceperword'] = this.state.inputs.priceperword;
    }

    var css = "@import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap'); #cheta-flt-dv { padding: 8px; z-index: 999; position: fixed; width: 140px; bottom: 40%; right: 40px; background-color: #1D1D1D; color: white; border-radius: 20px; text-align: center; box-shadow: 2px 2px 3px #999; } .cheta-flt-p { margin: 2px; font-family: 'Avenir-Book'; font-size: 22px; } .cheta-pfnt { margin: 2px; font-family: 'Avenir-Book'; font-size: 14px; }";
    chrome.tabs.insertCSS({code: css});

    chrome.tabs.executeScript({
      file: 'jquery.js'
    });

    chrome.tabs.executeScript({
      code: 'var config = ' + JSON.stringify(config)
    }, function() {
      chrome.tabs.executeScript({
        file: 'chetalib/chetalib.js'
      });
    })

  }

  handleInputChange = event => {
    const { name, value } = event.target;
    var inputs = this.state.inputs;
    inputs[name] = value;
    this.setState({
      inputs: inputs
    })
  }

  render() {
    return (
      <div>
        <img className="heart-image" src={heart} />
        <h1 className="spch-text">
            S<span className="inner-spch-text">PC</span>H
          </h1>
        <img className="line" src={line} />
        <h2>Instructions</h2>
        <p>1. Begin text with “{this.state.uniqueCode}”</p>
        <p>2. Type your message</p>
        <p>3. Enable extension to analyze text</p>
        
        <label class="switch">
          <input type="checkbox" onClick={this.nextTapped_det}></input>
          <span class="slider round"></span>
        </label>
        <h2>Enable extension</h2>
      </div>
    )
  };
}

export default Home;
