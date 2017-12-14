import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import VASTPlayer from 'vast-player';

import './Player.css';

export default class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null
    }

    this._player = null;
  }

  start = () => {
    this._player.startAd();
  }

  onError = (error) => {
    this.setState((state) => ({ ...state, error }));
  }

  onStart = () => {
    if (this.props.onStart) {
      this.props.onStart(this._player);
    }
  }

  onStop = () => {
    if (this.props.onStop) {
      this.props.onStop(this._player);
    }
  }

  componentDidMount() {
    this._player = new VASTPlayer(ReactDOM.findDOMNode(this.refs.container));
    this._player.load(this.props.source).then(this.start).catch(this.onError);

    this._player.once('AdStarted', this.onStart);
    this._player.once('AdStopped', this.onStop);
  }

  render() {
    if (this.state.error) throw new Error(this.state.error.message);

    return (
      <div ref="container" className="Player" style={this.props.style} />
    );
  }
}
