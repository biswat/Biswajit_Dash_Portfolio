import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';
import '../App.css'

class Toggle extends React.Component {
  constructor() {
    super();
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }



  render() {
    const five = "four + one"
    return (
      <div className="body">
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : five}
      </button>
      </div>

    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);

export default Toggle

