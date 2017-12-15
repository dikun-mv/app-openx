import React, { Component } from 'react';
import Player from './Player';
import { startScheduler, stopScheduler } from '../utils/outernets';

import './App.css';

const Error = ({ text }) => (
  <div className="Message">{text}</div>
);

const Logo = ({ style }) => (
  <div className="Message Logo" style={style}>OUTERNETS</div>
);

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      loading: true,
      error: null,
      config: null
    }
  }

  onPlayerStart = (player) => {
    this.setState((state) => ({ ...state, playing: true }));
    stopScheduler().catch((error) => this.setState((state) => ({ ...state, error })));
  }

  onPlayerStop = (player) => {
    this.setState((state) => ({ ...state, playing: false }));
    startScheduler().catch((error) => this.setState((state) => ({ ...state, error })));
  }

  componentWillMount() {
    fetch(`${window.location.pathname}config.json`, { credentials: 'include' })
      .then((response) => response.json())
      .then((config) => this.setState((state) => ({ ...state, config, loading: false })))
      .catch((error) => this.setState((state) => ({ ...state, error, loading: false })));
  }

  componentDidCatch(error = {}) {
    this.setState((state) => ({ ...state, error }));
  }

  render() {
    return (
      <div className="App">
        {!this.state.error && (
          <Logo style={{ opacity: this.state.playing ? 0 : 1 }} />
        )}
        {!this.state.loading && (
          this.state.error
            ? <Error text="Ooops, something went wrong!" />
            : <Player
              style={{ opacity: this.state.playing ? 1 : 0 }}
              source={this.state.config.url}
              onStart={this.onPlayerStart}
              onStop={this.onPlayerStop}
            />
        )}
      </div>
    );
  }
}
