import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import VASTPlayer from 'vast-player';

export default class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null
    }

    this._player = null;
  }

  start = () => this._player.startAd();

  onError = (error) => this.setState((state) => ({ ...state, error }));

  componentDidMount() {
    this._player = new VASTPlayer(ReactDOM.findDOMNode(this.refs.container));
    this._player.load(this.props.source).then(this.start).catch(this.onError);
  }

  render() {
    if (this.state.error) throw new Error(this.state.error.message);

    return (
      <div ref="container" className={this.props.className} />
    );
  }
}
