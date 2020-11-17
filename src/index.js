import React from 'react';
import ReactDOM from "react-dom";
import { observable } from 'mobx';
import observer from "mobx-react";

@observer class Counter extends React.Component{
  @observable count = 0;

  render(){
    return (
      <div>
        Counter: {this.count}<br />
        <button onClick={this.handleDec}>-</button>
        <button onClick={this.handleInc}>+</button>
      </div>
    )
  }

  handleDec = () => {
    this.count++;
  }

  handleInc = () => {
    this.count--;
  }
}

ReactDOM.render(
  <Counter />,
  document.getElementById('root')
);

