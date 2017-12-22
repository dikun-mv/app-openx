import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import VASTPlayer from 'vast-player';

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null
    }

    this.player = null;
  }

  playLoop = () => {
    this.player = new VASTPlayer(ReactDOM.findDOMNode(this.refs.container));

    this.player.load(this.props.src)
      .then(() => this.player.startAd())
      .catch((error) => this.setState({ error }));

    this.player.once('AdStopped', this.playLoop);
  }

  componentDidMount() {
    this.playLoop();
    this.player.once('AdStarted', () => this.props.onStart && this.props.onStart(this.player));
  }

  render() {
    if (this.state.error) throw this.state.error;

    return (
      <div ref="container" className="Player" />
    );
  }
}

export default Player;
